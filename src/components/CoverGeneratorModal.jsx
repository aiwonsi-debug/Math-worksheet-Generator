import React, { useState, useRef, useEffect, useCallback } from 'react';
import { themes, getThemeById } from '../config/themeConfig';

// Canvas size (internal resolution)
const SIZE = 1200;

// Default element positions (on 1200x1200 canvas)
const DEFAULT_ELEMENTS = {
  thumbnails: { x: 80, y: 380 },
  skillsPanel: { x: 830, y: 370 },
  badge: { x: 62, y: 1010 },
  logo: { x: 1040, y: 160 },
};

export default function CoverGeneratorModal({ isOpen, onClose, pageImages: capturedImages, onApplyCover }) {
  const [title, setTitle] = useState('MATH WORKSHEETS');
  const [subtitle, setSubtitle] = useState('ADDITION & SUBTRACTION');
  const [badgeText, setBadgeText] = useState('PRINT & GO!');
  const [badge1, setBadge1] = useState('30+ PAGES');
  const [badge2, setBadge2] = useState('NO PREP');
  const [gradeLevel, setGradeLevel] = useState('K-2');
  const [skills, setSkills] = useState('Numbers 1-20\nBasic Addition\nBasic Subtraction\nWord Problems\nMissing Numbers\nFact Families\nCommon Core Aligned');
  const [themeColor, setThemeColor] = useState('#1e3a8a');
  const [accentColor, setAccentColor] = useState('#fde047');
  const [selectedThemeId, setSelectedThemeId] = useState('');

  // เลือกธีมจาก dropdown แล้วเซ็ตสีให้ทันที ยังปรับสีเองภายหลังได้ตามปกติ
  const handleThemeSelect = (themeId) => {
    setSelectedThemeId(themeId);
    const theme = getThemeById(themeId);
    if (theme) {
      setThemeColor(theme.themeColor);
      setAccentColor(theme.accentColor);
    }
  };
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  const [worksheetImgSrcs, setWorksheetImgSrcs] = useState([]);
  const [elements, setElements] = useState(DEFAULT_ELEMENTS);

  // Drag state (refs to avoid stale closures)
  const dragging = useRef(null); // { key, startMouse, startEl }
  const canvasRef = useRef(null);
  const configRef = useRef({});
  const elementsRef = useRef(elements);

  // Keep refs in sync
  configRef.current = { title, subtitle, badgeText, badge1, badge2, gradeLevel, skills, themeColor, accentColor, logoSrc };
  elementsRef.current = elements;

  // Sync captured images → worksheet srcs on open
  useEffect(() => {
    if (isOpen && capturedImages && capturedImages.length > 0) {
      setWorksheetImgSrcs(capturedImages.slice(0, 3));
    }
  }, [isOpen, capturedImages]);

  // ── Image preloader
  const loadImg = (src) => new Promise(resolve => {
    if (!src) return resolve(null);
    const img = new window.Image();
    // only set crossOrigin for actual remote URLs, not data: or same-origin paths
    if (src.startsWith('http') && !src.startsWith(window.location.origin)) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

  // ── Main draw (reads from refs, safe to call anytime)
  const drawCover = useCallback(async (overrideElements) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cfg = configRef.current;
    const els = overrideElements || elementsRef.current;

    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');

    const [wsImgs, logoImg] = await Promise.all([
      Promise.all(worksheetImgSrcs.slice(0, 3).map(s => loadImg(s))),
      loadImg(cfg.logoSrc),
    ]);

    // ── Background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, SIZE);
    bg.addColorStop(0, '#eef2f7'); bg.addColorStop(1, '#dce5f0');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, SIZE, SIZE);

    // ── Top banner (taller to fit badges)
    ctx.fillStyle = cfg.themeColor;
    ctx.fillRect(0, 0, SIZE, 340);
    ctx.fillStyle = shadeColor(cfg.themeColor, -30);
    ctx.beginPath();
    ctx.moveTo(0, 340); ctx.lineTo(SIZE, 340); ctx.lineTo(SIZE, 385); ctx.lineTo(0, 400);
    ctx.closePath(); ctx.fill();

    // ── Title (left-aligned to leave room for logo)
    ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 3; ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 88px "Arial Black", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(cfg.title.toUpperCase(), 50, 118);
    ctx.shadowColor = 'transparent';

    // ── Subtitle
    ctx.fillStyle = cfg.accentColor;
    ctx.font = 'bold 50px "Arial Black", Arial, sans-serif';
    ctx.fillText(cfg.subtitle.toUpperCase(), 50, 198);

    // ── Change 5: "30+ PAGES" and "NO PREP" badges in banner
    const badges = [{ label: cfg.badge1, filled: true }, { label: cfg.badge2, filled: false }].filter(b => b.label);
    let bxCursor = 50;
    badges.forEach(({ label, filled }) => {
      ctx.font = 'bold 26px Arial';
      const bw = ctx.measureText(label).width + 40;
      const bh = 52;
      const by = 252;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.2)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
      if (filled) {
        ctx.fillStyle = cfg.accentColor;
        rrect(ctx, bxCursor, by, bw, bh, 26); ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#1a2a1a'; ctx.textAlign = 'center';
        ctx.fillText(label, bxCursor + bw / 2, by + 36);
      } else {
        ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 3;
        rrect(ctx, bxCursor, by, bw, bh, 26); ctx.stroke();
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
        ctx.fillText(label, bxCursor + bw / 2, by + 36);
      }
      ctx.restore();
      bxCursor += bw + 20;
    });

    // ── Worksheet thumbnails
    const { x: tx, y: ty } = els.thumbnails;
    const thumbW = 430, thumbH = 608;
    const rotations = [-14, 0, 13];
    const xOff = [-30, 10, 50];
    const yOff = [30, 0, 25];
    const numThumbs = Math.max(wsImgs.length, 1);

    for (let i = numThumbs - 1; i >= 0; i--) {
      const img = wsImgs[i];
      ctx.save();
      const cx = tx + thumbW / 2 + xOff[i] * 3;
      const cy = ty + thumbH / 2 + yOff[i] * 2;
      ctx.translate(cx, cy);
      ctx.rotate((rotations[i] * Math.PI) / 180);
      ctx.shadowColor = 'rgba(0,0,0,0.3)'; ctx.shadowBlur = 35; ctx.shadowOffsetX = 8; ctx.shadowOffsetY = 18;
      rrect(ctx, -thumbW / 2, -thumbH / 2, thumbW, thumbH, 8);
      ctx.fillStyle = '#ffffff'; ctx.fill();
      ctx.shadowColor = 'transparent';
      if (img) {
        ctx.save();
        ctx.beginPath(); rrect(ctx, -thumbW / 2 + 3, -thumbH / 2 + 3, thumbW - 6, thumbH - 6, 6); ctx.clip();
        ctx.drawImage(img, -thumbW / 2 + 3, -thumbH / 2 + 3, thumbW - 6, thumbH - 6);
        ctx.restore();
      } else {
        // Change 1: Draw a real worksheet mockup instead of blank lines
        const lx = -thumbW / 2 + 24;
        // Name line
        ctx.fillStyle = '#1a5c40'; ctx.font = 'bold 26px Arial'; ctx.textAlign = 'left';
        ctx.fillText('Name:', lx, -thumbH / 2 + 56);
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(lx + 110, -thumbH / 2 + 54); ctx.lineTo(thumbW / 2 - 20, -thumbH / 2 + 54); ctx.stroke();
        // Math problems
        const problems = ['7 + 5 =', '12 - 4 =', '9 + 6 ='];
        problems.forEach((prob, pi) => {
          const py = -thumbH / 2 + 125 + pi * 120;
          ctx.fillStyle = '#1e293b'; ctx.font = 'bold 42px "Courier New", monospace'; ctx.textAlign = 'left';
          ctx.fillText(prob, lx, py);
          // Answer box
          ctx.strokeStyle = '#1a5c40'; ctx.lineWidth = 3;
          ctx.strokeRect(lx + ctx.measureText(prob).width + 16, py - 40, 54, 54);
        });
        // Apple icons row (emoji)
        ctx.font = '44px serif'; ctx.textAlign = 'left';
        ['🍎', '🍎', '🍎'].forEach((em, ei) => ctx.fillText(em, lx + ei * 72, thumbH / 2 - 60));
      }
      ctx.restore();
    }

    // ── Skills panel
    const { x: pX, y: pY } = els.skillsPanel;
    const skillList = cfg.skills.split('\n').filter(s => s.trim());
    // Dynamic panel height to fit all skills
    const pW = 340;
    const pH = Math.max(680, 110 + skillList.length * 72 + 60);
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.18)'; ctx.shadowBlur = 28; ctx.shadowOffsetY = 12;
    ctx.fillStyle = '#fff'; rrect(ctx, pX, pY, pW, pH, 18); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.restore();
    ctx.fillStyle = cfg.themeColor;
    ctx.save(); ctx.beginPath(); rrectTop(ctx, pX, pY, pW, 92, 18); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 44px "Arial Black", Arial, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(cfg.gradeLevel, pX + pW / 2, pY + 64);
    ctx.fillStyle = cfg.themeColor; ctx.font = 'bold 22px Arial'; ctx.textAlign = 'left';
    ctx.fillText('SKILLS INCLUDED:', pX + 22, pY + 130);
    // Change 6: render all skills including Common Core Aligned at bottom
    skillList.forEach((skill, i) => {
      const isLast = skill.toLowerCase().includes('common core');
      const sy = pY + 168 + i * 68;
      if (isLast) {
        // Common Core Aligned — separator line + italic grey
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(pX + 20, sy - 14); ctx.lineTo(pX + pW - 20, sy - 14); ctx.stroke();
        ctx.fillStyle = '#94a3b8'; ctx.font = 'italic 19px Arial';
        ctx.fillText(skill, pX + 22, sy + 8);
      } else {
        ctx.fillStyle = cfg.accentColor; ctx.beginPath(); ctx.arc(pX + 30, sy, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#334155'; ctx.font = '21px Arial'; ctx.fillText(skill, pX + 52, sy + 8);
      }
    });

    // ── Badge (PRINT & GO)
    const { x: bdX, y: bdY } = els.badge;
    const bdW = 290, bdH = 100;
    ctx.save();
    ctx.shadowColor = 'rgba(239,68,68,0.45)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#ef4444'; rrect(ctx, bdX, bdY, bdW, bdH, 50); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.restore();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 33px Arial'; ctx.textAlign = 'center';
    ctx.fillText(cfg.badgeText.toUpperCase(), bdX + bdW / 2, bdY + 62);

    // Change 3: Logo — larger circle (lr=105) with white ring border
    if (logoImg) {
      const { x: lx, y: ly } = els.logo;
      const lr = 105;
      ctx.save();
      // Outer white ring
      ctx.beginPath(); ctx.arc(lx, ly, lr + 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = 18;
      ctx.fill(); ctx.shadowColor = 'transparent';
      // Clip & draw logo
      ctx.beginPath(); ctx.arc(lx, ly, lr, 0, Math.PI * 2); ctx.clip();
      ctx.drawImage(logoImg, lx - lr, ly - lr, lr * 2, lr * 2);
      ctx.restore();
    }
  }, [worksheetImgSrcs]);

  // Redraw on any change
  useEffect(() => {
    if (!isOpen) return;
    drawCover();
  }, [isOpen, drawCover, elements, title, subtitle, badgeText, badge1, badge2, gradeLevel, skills, themeColor, accentColor, logoSrc]);

  // ── Hit testing: which element did user click?
  const hitTest = (canvasX, canvasY, els) => {
    const thumbW = 430, thumbH = 608;
    const { x: tx, y: ty } = els.thumbnails;
    if (canvasX >= tx && canvasX <= tx + thumbW + 80 && canvasY >= ty && canvasY <= ty + thumbH) return 'thumbnails';

    const { x: pX, y: pY } = els.skillsPanel;
    if (canvasX >= pX && canvasX <= pX + 330 && canvasY >= pY && canvasY <= pY + 680) return 'skillsPanel';

    const { x: bX, y: bY } = els.badge;
    if (canvasX >= bX && canvasX <= bX + 280 && canvasY >= bY && canvasY <= bY + 100) return 'badge';

    const { x: lx, y: ly } = els.logo;
    if (logoSrc && Math.hypot(canvasX - lx, canvasY - ly) <= 88) return 'logo';

    return null;
  };

  // Convert mouse event to canvas coordinates
  const toCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = SIZE / rect.width;
    const scaleY = SIZE / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const { x, y } = toCanvasCoords(e);
    const key = hitTest(x, y, elementsRef.current);
    if (!key) return;
    dragging.current = {
      key,
      startMouse: { x, y },
      startEl: { ...elementsRef.current[key] },
    };
    canvasRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) {
      // Show grab cursor on hover
      const { x, y } = toCanvasCoords(e);
      const key = hitTest(x, y, elementsRef.current);
      canvasRef.current.style.cursor = key ? 'grab' : 'default';
      return;
    }
    e.preventDefault();
    const { x, y } = toCanvasCoords(e);
    const { key, startMouse, startEl } = dragging.current;
    const dx = x - startMouse.x;
    const dy = y - startMouse.y;
    const newEls = {
      ...elementsRef.current,
      [key]: { x: startEl.x + dx, y: startEl.y + dy },
    };
    setElements(newEls);
  };

  const handleMouseUp = () => {
    dragging.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'default';
  };

  // Upload custom worksheet photos
  const handleWorksheetUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    const srcs = [];
    let loaded = 0;
    files.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        srcs[idx] = ev.target.result;
        loaded++;
        if (loaded === files.length) setWorksheetImgSrcs([...srcs]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const downloadCover = async () => {
    await drawCover();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'worksheet-cover.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetLayout = () => setElements(DEFAULT_ELEMENTS);

  if (!isOpen) return null;

  const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' };
  const inputStyle = { width: '100%', padding: '7px 10px', border: '1px solid #cbd5e1', borderRadius: '7px', fontSize: '13px', boxSizing: 'border-box', outline: 'none' };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.78)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '22px', width: '100%', maxWidth: '1120px', maxHeight: '94vh', display: 'grid', gridTemplateColumns: '265px 1fr', gap: '20px', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>

        {/* ─── Sidebar ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
            <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#1e293b' }}>🎨 Cover Settings</h2>
            <button onClick={resetLayout} style={{ fontSize: '11px', padding: '4px 8px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#f8fafc', cursor: 'pointer', color: '#64748b' }}>↺ Reset Layout</button>
          </div>

          {[['Title', title, setTitle], ['Subtitle', subtitle, setSubtitle], ['Badge Text', badgeText, setBadgeText], ['Grade Level', gradeLevel, setGradeLevel]].map(([lbl, val, set]) => (
            <div key={lbl}>
              <label style={labelStyle}>{lbl}</label>
              <input type="text" style={inputStyle} value={val} onChange={e => set(e.target.value)} />
            </div>
          ))}

          <div style={{ display: 'flex', gap: '8px' }}>
            {[['Top Badge 1 (Solid)', badge1, setBadge1], ['Top Badge 2 (Outline)', badge2, setBadge2]].map(([lbl, val, set]) => (
              <div key={lbl} style={{ flex: 1 }}>
                <label style={labelStyle}>{lbl}</label>
                <input type="text" style={inputStyle} value={val} onChange={e => set(e.target.value)} />
              </div>
            ))}
          </div>

          <div>
            <label style={labelStyle}>Skills (one per line)</label>
            <textarea style={{ ...inputStyle, height: '80px', resize: 'vertical' }} value={skills} onChange={e => setSkills(e.target.value)} />
          </div>

          <div>
            <label style={labelStyle}>Seasonal Theme</label>
            <select
              style={{ ...inputStyle, cursor: 'pointer' }}
              value={selectedThemeId}
              onChange={e => handleThemeSelect(e.target.value)}
            >
              <option value="">— เลือกธีม (กำหนดสีเอง) —</option>
              {themes.map(t => (
                <option key={t.id} value={t.id}>{t.displayName}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {[['Theme', themeColor, setThemeColor], ['Accent', accentColor, setAccentColor]].map(([lbl, val, set]) => (
              <div key={lbl} style={{ flex: 1 }}>
                <label style={labelStyle}>{lbl} Color</label>
                <input type="color" style={{ ...inputStyle, padding: '2px', height: '36px', cursor: 'pointer' }} value={val} onChange={e => set(e.target.value)} />
              </div>
            ))}
          </div>

          {/* Upload worksheet photos */}
          <div style={{ background: '#f0f9ff', border: '1px dashed #7dd3fc', borderRadius: '8px', padding: '10px' }}>
            <label style={{ ...labelStyle, color: '#0369a1' }}>📄 Worksheet Photos (up to 3)</label>
            <p style={{ fontSize: '11px', color: '#0ea5e9', margin: '0 0 6px' }}>Upload your own, or auto-captured pages are used</p>
            <input type="file" accept="image/*" multiple style={{ fontSize: '12px', width: '100%' }} onChange={handleWorksheetUpload} />
            {worksheetImgSrcs.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                {worksheetImgSrcs.map((src, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={src} alt={`Page ${i+1}`} style={{ width: '60px', height: '85px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #bae6fd' }} />
                    <button onClick={() => setWorksheetImgSrcs(prev => prev.filter((_, pi) => pi !== i))}
                      style={{ position: 'absolute', top: '-6px', right: '-6px', width: '16px', height: '16px', borderRadius: '50%', border: 'none', background: '#ef4444', color: 'white', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, padding: 0 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Logo */}
          <div>
            <label style={labelStyle}>Logo (circle, optional)</label>
            <input type="file" accept="image/*" style={{ fontSize: '12px', width: '100%' }} onChange={handleLogoUpload} />
            {logoSrc && <button onClick={() => setLogoSrc(null)} style={{ marginTop: '4px', fontSize: '11px', padding: '2px 8px', border: '1px solid #fca5a5', borderRadius: '5px', background: '#fff', color: '#ef4444', cursor: 'pointer' }}>Remove logo</button>}
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px', flexDirection: 'column' }}>
            <button onClick={async () => {
              await drawCover();
              if (canvasRef.current && onApplyCover) {
                onApplyCover(canvasRef.current.toDataURL('image/png'));
                onClose();
              }
            }} style={{ padding: '10px', borderRadius: '8px', border: 'none', background: '#10b981', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}>Apply Cover to PDF Export</button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f1f5f9', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Cancel</button>
              <button onClick={downloadCover} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}>⬇ Download PNG</button>
            </div>
          </div>
        </div>

        {/* ─── Canvas Preview ─── */}
        <div style={{ background: '#f1f5f9', border: '2px dashed #cbd5e1', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px', gap: '8px' }}>
          <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>✋ Drag elements to reposition them on the cover</p>
          <div style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.2)', borderRadius: '6px', overflow: 'hidden', width: '100%', maxWidth: '560px', aspectRatio: '1/1', userSelect: 'none' }}>
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', display: 'block', cursor: 'default' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function rrectTop(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function shadeColor(hex, amount) {
  const n = parseInt(hex.replace('#', ''), 16);
  const c = v => Math.min(255, Math.max(0, v));
  return '#' + [c((n >> 16) + amount), c(((n >> 8) & 0xff) + amount), c((n & 0xff) + amount)]
    .map(v => v.toString(16).padStart(2, '0')).join('');
}
