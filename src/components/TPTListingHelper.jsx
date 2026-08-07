import React, { useState, useEffect, useMemo } from 'react';

// ── TPT Subject Areas (matches TPT's actual dropdown)
const SUBJECT_AREAS = ['Basic Operations', 'Numbers', 'Algebra', 'Geometry', 'Measurement', 'Math Test Prep', 'Other (Math)'];

// ── TPT Theme tags & High-Converting Best-Seller Keywords
const SUGGESTED_TAGS = [
  'Print & Go', 'No Prep', 'Printable', 'Worksheet', 'Math Center',
  'Homeschool', 'Early Finishers', 'Morning Work', 'Homework', 'Common Core',
  'Distance Learning', 'Independent Practice', 'Differentiated', 'Math Fact Fluency',
  'Answer Key Included', 'Sub Plans', 'Spiral Review', 'Timed Tests'
];

const BEST_SELLER_KEYWORD_PACKS = {
  utility: ['No Prep', 'Print & Go', 'Math Centers', 'Morning Work', 'Math Fact Fluency', 'Sub Plans', 'Answer Key Included', 'Differentiated', 'Spiral Review', 'Independent Practice', 'Timed Tests', 'Homework'],
  seasonal: ['Back to School Math', 'Fall Math Worksheets', 'Halloween Math', 'Winter Math Centers', '100th Day of School', 'Spring Math Review', 'Summer Math Packet'],
  skills: ['Addition & Subtraction', 'Fact Fluency', 'Missing Addends', 'Ten Frames', 'Number Bonds', 'Regrouping', 'Place Value', 'Word Problems', 'Telling Time', 'Multiplication Drills', 'Fractions & Decimals']
};

// ── Topic → keyword mapping
const TOPIC_KEYWORDS = {
  basic_math: 'Addition and Subtraction',
  missing_number: 'Missing Numbers',
  comparison: 'Comparing Numbers',
  number_bond: 'Number Bonds',
  number_line: 'Number Line Addition',
  ten_frame: 'Ten Frames',
};

// ── Grade suggestions per setting
const GRADE_MAP = {
  1: ['Kindergarten', '1st Grade'],
  5: ['Kindergarten', '1st Grade', '2nd Grade'],
  10: ['1st Grade', '2nd Grade'],
  20: ['1st Grade', '2nd Grade', '3rd Grade'],
  50: ['2nd Grade', '3rd Grade'],
  100: ['2nd Grade', '3rd Grade', '4th Grade'],
};

const ALL_GRADES = ['Preschool', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade'];

// ── Price suggestion based on page count
function suggestPrice(pages) {
  if (pages <= 10) return 1.50;
  if (pages <= 20) return 2.50;
  if (pages <= 40) return 3.50;
  if (pages <= 60) return 4.50;
  return 6.00;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={copy} style={{
      padding: '4px 12px', borderRadius: '6px', border: '1px solid #cbd5e1',
      background: copied ? '#10b981' : 'var(--color-bg)', color: copied ? 'white' : 'var(--color-text-muted)',
      cursor: 'pointer', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s',
      display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap'
    }}>
      {copied ? '✓ Copied!' : '📋 Copy'}
    </button>
  );
}

function Section({ title, hint, children }) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', padding: '12px 18px' }}>
        <div style={{ fontWeight: 700, fontSize: '15px', color: '#1e293b' }}>{title}</div>
        {hint && <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{hint}</div>}
      </div>
      <div style={{ padding: '16px 18px' }}>{children}</div>
    </div>
  );
}

export default function TPTListingHelper({ topic, operator, maxVal, totalPages, numProblems }) {
  // ── Derived defaults from worksheet settings
  const topicName = TOPIC_KEYWORDS[topic] || 'Math';
  const operatorLabel = topic === 'basic_math' ? (operator === '+' ? 'Addition' : operator === '-' ? 'Subtraction' : 'Mixed') : '';

  // ── 1. Title
  const defaultTitle = useMemo(() => {
    const skill = operatorLabel || topicName;
    const range = maxVal ? ` Within ${maxVal}` : '';
    return `${skill}${range} Worksheets | K-2 | Print & Go | No Prep`;
  }, [topicName, operatorLabel, maxVal]);

  const [title, setTitle] = useState(defaultTitle);
  useEffect(() => setTitle(defaultTitle), [defaultTitle]);

  // ── 2. Description
  const defaultDesc = useMemo(() => {
    const skill = operatorLabel || topicName;
    const range = maxVal ? ` within ${maxVal}` : '';
    return `⭐ NO PREP ${skill}${range} practice that students love and teachers trust!\n\nThis ready-to-print math resource is perfect for independent practice, morning work, homework, or math centers. Simply print and go — no laminating, no prep time needed!\n\n✅ WHAT'S INCLUDED:\n• ${totalPages || '30'}+ printable worksheets\n• ${numProblems || 10} problems per page\n• Answer key included\n• ${skill} practice${range}\n• Common Core aligned\n\n✏️ PERFECT FOR:\n• Kindergarten – 2nd Grade students\n• Extra practice or review\n• Morning work & homework\n• Math stations and centers\n• Sub plans & early finishers\n\n⭐ WHY TEACHERS LOVE IT:\n• Zero prep — just print!\n• Progressive difficulty builds confidence\n• Clean, distraction-free design\n• Works great for remote or in-person learning\n\nQuestions? Message me anytime. Happy teaching! 🍎`;
  }, [topicName, operatorLabel, maxVal, totalPages, numProblems]);

  const [description, setDescription] = useState(defaultDesc);
  useEffect(() => setDescription(defaultDesc), [defaultDesc]);

  // ── 3. Grades
  const suggestedGrades = useMemo(() => {
    const closest = Object.keys(GRADE_MAP).reduce((prev, cur) =>
      Math.abs(cur - maxVal) < Math.abs(prev - maxVal) ? cur : prev, Object.keys(GRADE_MAP)[0]);
    return GRADE_MAP[closest] || ['Kindergarten', '1st Grade', '2nd Grade'];
  }, [maxVal]);

  const [selectedGrades, setSelectedGrades] = useState(suggestedGrades);
  useEffect(() => setSelectedGrades(suggestedGrades), [suggestedGrades]);

  const toggleGrade = (g) => setSelectedGrades(prev =>
    prev.includes(g) ? prev.filter(x => x !== g) : prev.length < 4 ? [...prev, g] : prev
  );

  // ── 4. Subject
  const [selectedSubjects, setSelectedSubjects] = useState(['Basic Operations', 'Numbers']);
  const toggleSubject = (s) => setSelectedSubjects(prev =>
    prev.includes(s) ? prev.filter(x => x !== s) : prev.length < 3 ? [...prev, s] : prev
  );

  // ── 5. Tags
  const defaultTags = ['Print & Go', 'No Prep', 'Worksheet', 'Math Center', 'Printable', 'Common Core'];
  const [selectedTags, setSelectedTags] = useState(defaultTags);
  const toggleTag = (t) => setSelectedTags(prev =>
    prev.includes(t) ? prev.filter(x => x !== t) : prev.length < 6 ? [...prev, t] : prev
  );

  // ── 6. Pricing
  const basePrice = suggestPrice(totalPages || 30);
  const [price, setPrice] = useState(basePrice.toFixed(2));
  const multiLicense = (parseFloat(price) * 1.5).toFixed(2);

  const titleLen = title.length;

  const labelStyle = { fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' };
  const chipBase = { padding: '5px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', border: '1.5px solid', fontWeight: 500, transition: 'all 0.15s' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '14px', padding: '20px 24px', color: 'white' }}>
        <div style={{ fontSize: '20px', fontWeight: 800 }}>🛒 TPT Listing Helper</div>
        <div style={{ fontSize: '13px', opacity: 0.85, marginTop: '4px' }}>
          Auto-filled from your worksheet settings • Click any field to customize • Copy to paste into TPT
        </div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '14px', flexWrap: 'wrap' }}>
          {[
            ['Topic', topicName + (operatorLabel ? ` (${operatorLabel})` : '')],
            ['Pages', `${totalPages || '?'} pages`],
            ['Problems/pg', `${numProblems || '?'} problems`],
            ['Max Value', `Within ${maxVal || '?'}`],
          ].map(([k, v]) => (
            <div key={k} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '6px 14px' }}>
              <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{k}</div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. Title */}
      <Section title="1. Product Title" hint="Max 80 characters • Include skill + grade + format + benefit">
        <div style={{ position: 'relative' }}>
          <input
            type="text" value={title} onChange={e => setTitle(e.target.value)}
            maxLength={80}
            style={{ width: '100%', padding: '10px 14px', border: `2px solid ${titleLen > 75 ? '#ef4444' : titleLen > 60 ? '#f59e0b' : 'var(--color-border)'}`, borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', fontWeight: 600, outline: 'none' }}
          />
          <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: titleLen > 75 ? '#ef4444' : '#94a3b8', fontWeight: 600 }}>
            {titleLen}/80
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            {titleLen <= 60 ? '✅ Good length' : titleLen <= 75 ? '⚠️ Getting long' : '❌ Too long — trim it'}
          </div>
          <CopyButton text={title} />
        </div>

        {/* 🚀 Best-Selling Title Formulas */}
        <div style={{ marginTop: '14px', background: '#f0f9ff', borderRadius: '8px', padding: '12px 14px', border: '1px solid #bae6fd' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#0369a1', marginBottom: '8px' }}>🔥 1-Click Best-Selling Title Formulas:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              `${operatorLabel || topicName}${maxVal ? ' Within ' + maxVal : ''} Worksheets | ${suggestedGrades[0] || '1st Grade'} | No Prep Fact Fluency`,
              `${suggestedGrades[0] || '1st Grade'} ${operatorLabel || topicName} | Print & Go Math Centers`,
              `${operatorLabel || topicName}${maxVal ? ' 1-' + maxVal : ''} Practice | Morning Work & Homework | Answer Key`,
              `No Prep ${operatorLabel || topicName} Worksheets | ${suggestedGrades.join(' & ') || 'K-2'} Sub Plans`,
            ].map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => setTitle(tmpl.slice(0, 80))}
                style={{
                  textAlign: 'left', padding: '6px 10px', background: 'white', borderRadius: '6px',
                  border: '1px solid #7dd3fc', fontSize: '12px', color: '#0284c7', cursor: 'pointer',
                  fontWeight: 600, transition: 'all 0.15s'
                }}
              >
                ⚡ Use: "{tmpl.slice(0, 80)}"
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 2. Description */}
      <Section title="2. Product Description" hint="First 150 chars appear in search results — make them count!">
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '10px 12px', marginBottom: '10px', fontSize: '12px', color: '#92400e' }}>
          <strong>🔑 Search snippet preview (first 150 chars):</strong><br />
          <em>"{description.slice(0, 150)}..."</em>
        </div>
        <textarea
          value={description} onChange={e => setDescription(e.target.value)}
          rows={16}
          style={{ width: '100%', padding: '10px 14px', border: '2px solid var(--color-border)', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', outline: 'none', lineHeight: 1.6 }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <CopyButton text={description} />
        </div>
      </Section>

      {/* ── 3. Grade Level */}
      <Section title="3. Grade Level" hint="Select up to 4 grades that this resource is truly appropriate for">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {ALL_GRADES.map(g => {
            const active = selectedGrades.includes(g);
            const suggested = suggestedGrades.includes(g);
            return (
              <button key={g} onClick={() => toggleGrade(g)} style={{
                ...chipBase,
                borderColor: active ? '#3b82f6' : suggested ? '#93c5fd' : 'var(--color-border)',
                background: active ? '#3b82f6' : suggested ? '#eff6ff' : 'var(--color-bg)',
                color: active ? 'white' : suggested ? '#1d4ed8' : 'var(--color-text-muted)',
              }}>
                {suggested && !active ? '★ ' : ''}{g}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
          ★ = Suggested for your settings • {selectedGrades.length}/4 selected
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <div style={{ fontSize: '13px', color: '#475569' }}>Selected: <strong>{selectedGrades.join(', ') || 'None'}</strong></div>
          <CopyButton text={selectedGrades.join(', ')} />
        </div>
      </Section>

      {/* ── 4. Subject Area */}
      <Section title="4. Subject Area" hint="Select up to 3 subject areas">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SUBJECT_AREAS.map(s => {
            const active = selectedSubjects.includes(s);
            return (
              <button key={s} onClick={() => toggleSubject(s)} style={{
                ...chipBase,
                borderColor: active ? '#8b5cf6' : 'var(--color-border)',
                background: active ? '#8b5cf6' : 'var(--color-bg)',
                color: active ? 'white' : 'var(--color-text-muted)',
              }}>
                {s}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>{selectedSubjects.length}/3 selected</div>
      </Section>

      {/* ── 5. Tags */}
      <Section title="5. Tags & Best-Seller Keywords" hint="Select up to 6 tags — click any keyword pack item below to toggle">
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>🔥 High-Converting Utility Keywords:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {BEST_SELLER_KEYWORD_PACKS.utility.map(t => {
              const active = selectedTags.includes(t);
              return (
                <button key={t} onClick={() => toggleTag(t)} style={{
                  ...chipBase,
                  borderColor: active ? '#10b981' : 'var(--color-border)',
                  background: active ? '#10b981' : 'var(--color-bg)',
                  color: active ? 'white' : '#475569',
                }}>
                  {t}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>🍂 Seasonal & Holiday Keyword Spikes:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {BEST_SELLER_KEYWORD_PACKS.seasonal.map(t => {
              const active = selectedTags.includes(t);
              return (
                <button key={t} onClick={() => toggleTag(t)} style={{
                  ...chipBase,
                  borderColor: active ? '#f59e0b' : 'var(--color-border)',
                  background: active ? '#f59e0b' : 'var(--color-bg)',
                  color: active ? 'white' : '#475569',
                }}>
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          {SUGGESTED_TAGS.filter(t => !BEST_SELLER_KEYWORD_PACKS.utility.includes(t) && !BEST_SELLER_KEYWORD_PACKS.seasonal.includes(t)).map(t => {
            const active = selectedTags.includes(t);
            return (
              <button key={t} onClick={() => toggleTag(t)} style={{
                ...chipBase,
                borderColor: active ? '#10b981' : 'var(--color-border)',
                background: active ? '#10b981' : 'var(--color-bg)',
                color: active ? 'white' : 'var(--color-text-muted)',
              }}>
                {t}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: selectedTags.length >= 6 ? '#ef4444' : '#94a3b8' }}>
            {selectedTags.length}/6 selected {selectedTags.length >= 6 ? '— max reached' : ''}
          </div>
          <CopyButton text={selectedTags.join(', ')} />
        </div>
      </Section>

      {/* ── 6. Pricing Calculator */}
      <Section title="6. Pricing Calculator" hint={`Suggested for ${totalPages || 30} pages`}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          {/* Price */}
          <div>
            <label style={labelStyle}>💵 Price (USD)</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
              <span style={{ padding: '0 10px', background: '#f1f5f9', color: 'var(--color-text-muted)', fontWeight: 700, fontSize: '16px' }}>$</span>
              <input type="number" min="0" step="0.50" value={price} onChange={e => setPrice(e.target.value)}
                style={{ border: 'none', padding: '10px 12px', fontSize: '16px', fontWeight: 700, width: '100%', outline: 'none', color: '#1e293b' }} />
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
              Suggested: ${suggestPrice(totalPages || 30).toFixed(2)}
            </div>
          </div>
          {/* Multi-license */}
          <div>
            <label style={labelStyle}>👥 Multiple Licenses</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--color-bg)' }}>
              <span style={{ padding: '0 10px', background: '#f1f5f9', color: 'var(--color-text-muted)', fontWeight: 700, fontSize: '16px' }}>$</span>
              <span style={{ padding: '10px 12px', fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>{multiLicense}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Auto: price × 1.5</div>
          </div>
          {/* Bundle hint */}
          <div>
            <label style={labelStyle}>📦 Bundle Discount (optional)</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
              <span style={{ padding: '0 10px', background: '#f1f5f9', color: 'var(--color-text-muted)', fontWeight: 700, fontSize: '16px' }}>$</span>
              <input type="number" min="0" step="0.50" defaultValue=""
                placeholder="—"
                style={{ border: 'none', padding: '10px 12px', fontSize: '16px', fontWeight: 700, width: '100%', outline: 'none', color: '#1e293b' }} />
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>If selling in a bundle</div>
          </div>
        </div>

        {/* Pricing guide */}
        <div style={{ marginTop: '16px', background: '#f0fdf4', borderRadius: '8px', padding: '12px 16px', border: '1px solid #bbf7d0' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', marginBottom: '6px' }}>📊 TPT Pricing Guide</div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '12px', color: '#166534' }}>
            {[['1–10 pgs', '$1.00–$2.00'], ['11–20 pgs', '$2.00–$3.00'], ['21–40 pgs', '$3.00–$4.00'], ['41–60 pgs', '$4.00–$5.00'], ['60+ pgs', '$5.00–$7.00']].map(([r, p]) => (
              <div key={r} style={{ background: 'white', borderRadius: '6px', padding: '4px 10px', border: '1px solid #bbf7d0' }}>
                <strong>{r}</strong> → {p}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 7. SEO & Trending Search Checklist */}
      <Section title="7. SEO & Trending Search" hint="Checklist for optimizing your search rankings">
        {[
          ['Search Analytics in Seller Dashboard', 'Check which search terms bring the most traffic to Attapol.k store'],
          ['Check TPT Seller Blog', 'Look for "Trending TPT Searches" every quarter (especially 3 months ahead)'],
          ['Use SellerSpy.co', 'Find high-search/low-competition keywords in "math worksheets" and "phonics"'],
          ['Plan 6-8 weeks ahead', 'TPT advises seasonal planning so you match the time teachers actually start searching'],
        ].map(([item, note]) => (
          <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
            <input type="checkbox" style={{ marginTop: '2px', width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3b82f6' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{item}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{note}</div>
            </div>
          </div>
        ))}
      </Section>

      {/* ── 8. Checklist */}
      <Section title="8. Pre-Upload Checklist" hint="Complete all items before uploading to TPT">
        {[
          ['Cover image (1:1 square)', 'Create using the Cover Creator tab'],
          ['Preview pages (3–5 pages)', 'Show real content so teachers know what they\'re buying'],
          ['Answer key included in PDF', 'Use "Include Answer Key" when exporting'],
          ['Watermark / copyright text', 'Already on your worksheets: © Attapol.k'],
          ['PDF file under 4GB', 'Your export will be well under this'],
          ['Description filled in', '✅ Done above'],
          ['Title under 80 chars', titleLen <= 80 ? '✅ Done' : `❌ Currently ${titleLen} chars — trim it`],
          ['Tax code selected on TPT', 'Required for sales tax collection'],
        ].map(([item, note]) => (
          <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
            <input type="checkbox" defaultChecked={note.startsWith('✅')} style={{ marginTop: '2px', width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3b82f6' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{item}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{note}</div>
            </div>
          </div>
        ))}
      </Section>

      {/* ── Copy All button */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: 'white' }}>
          <div style={{ fontWeight: 700, fontSize: '15px' }}>Ready to upload?</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Use the copy buttons above to paste each field into TPT</div>
        </div>
        <button
          onClick={() => {
            const full = `TITLE:\n${title}\n\nDESCRIPTION:\n${description}\n\nGRADE LEVELS: ${selectedGrades.join(', ')}\nSUBJECT AREAS: ${selectedSubjects.join(', ')}\nTAGS: ${selectedTags.join(', ')}\nPRICE: $${price} | MULTI-LICENSE: $${multiLicense}`;
            navigator.clipboard.writeText(full);
          }}
          style={{ padding: '12px 22px', background: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '14px', color: '#7c3aed', cursor: 'pointer' }}
        >
          📋 Copy All Fields
        </button>
      </div>

    </div>
  );
}
