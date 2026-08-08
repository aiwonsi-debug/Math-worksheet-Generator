import React, { useState, useEffect } from 'react';
import Terminal from '@tabler/icons-react/dist/esm/icons/IconTerminal.mjs';
import Copy from '@tabler/icons-react/dist/esm/icons/IconCopy.mjs';
import Check from '@tabler/icons-react/dist/esm/icons/IconCheck.mjs';
import Download from '@tabler/icons-react/dist/esm/icons/IconDownload.mjs';
import FileCode from '@tabler/icons-react/dist/esm/icons/IconFileCode.mjs';
import Package from '@tabler/icons-react/dist/esm/icons/IconBox.mjs';
import HelpCircle from '@tabler/icons-react/dist/esm/icons/IconHelp.mjs';
import X from '@tabler/icons-react/dist/esm/icons/IconX.mjs';
import PlayerPlay from '@tabler/icons-react/dist/esm/icons/IconPlayerPlay.mjs';
import Refresh from '@tabler/icons-react/dist/esm/icons/IconRefresh.mjs';

const TOPIC_PRESETS = [
  {
    id: 'addition-within-10.json',
    label: '🔥 Addition Within 10 (Visual Dots)',
    path: 'topics/addition-within-10.json',
    badge: 'Grade K-1',
    description: 'Kindergarten & Grade 1 Math Practice with visual dot manipulatives'
  },
  {
    id: 'addition-within-20.json',
    label: '🔥 Addition Within 20 (Fact Fluency)',
    path: 'topics/addition-within-20.json',
    badge: 'Grade 1',
    description: 'Grade 1 Math Practice building mental math fluency up to 20'
  },
  {
    id: 'subtraction-within-10.json',
    label: '🔥 Subtraction Within 10 (Early Math)',
    path: 'topics/subtraction-within-10.json',
    badge: 'Grade K-1',
    description: 'Early subtraction practice with 3x4 visual layouts & answer keys'
  },
  {
    id: 'subtraction-within-20.json',
    label: '🔥 Subtraction Within 20 (Fact Fluency)',
    path: 'topics/subtraction-within-20.json',
    badge: 'Grade 1-2',
    description: 'Grade 1 & 2 subtraction fact fluency worksheets & answer keys'
  },
  {
    id: 'multiplication-tables-1-10.json',
    label: '🔥 Multiplication Tables 1-10 (Times Tables)',
    path: 'topics/multiplication-tables-1-10.json',
    badge: 'Grade 2-4',
    description: 'Elementary times table drills (facts 1-10) with complete answer keys'
  },
  {
    id: 'division-basics-1-10.json',
    label: '🔥 Division Basics 1-10 (Fact Families)',
    path: 'topics/division-basics-1-10.json',
    badge: 'Grade 3-5',
    description: 'Basic division practice & fact family drills with highlighted answers'
  },
  {
    id: 'missing-addends-within-20.json',
    label: '🔥 Missing Addends Within 20 (Algebraic Boxes)',
    path: 'topics/missing-addends-within-20.json',
    badge: 'Grade 1-2',
    description: 'Fill-in-the-blank missing addends developing early algebraic thinking'
  },
  {
    id: 'double-digit-addition-no-regrouping.json',
    label: '🔥 2-Digit Addition (No Regrouping)',
    path: 'topics/double-digit-addition-no-regrouping.json',
    badge: 'Grade 1-2',
    description: 'Place value two-digit addition practice without carrying'
  },
  {
    id: 'double-digit-subtraction-no-regrouping.json',
    label: '🔥 2-Digit Subtraction (No Regrouping)',
    path: 'topics/double-digit-subtraction-no-regrouping.json',
    badge: 'Grade 1-2',
    description: 'Place value two-digit subtraction practice without borrowing'
  },
  {
    id: 'addition-missing-first-classic.json',
    label: 'Addition Missing First (Classic Boxes)',
    path: 'topics/addition-missing-first-classic.json',
    badge: 'Grade 1',
    description: 'Grade 1 Math Practice with missing addends & classic box style'
  },
  {
    id: 'live-editor',
    label: '✨ Live Active Editor Config (Custom JSON)',
    path: 'topics/custom-live-topic.json',
    badge: 'Custom',
    description: 'Generates JSON based on your current math & layout settings in the editor'
  }
];

export default function PythonGeneratorModal({ isOpen, onClose, currentConfig = {} }) {
  const [selectedTopicId, setSelectedTopicId] = useState('addition-missing-first-classic.json');
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedEnvCmd, setCopiedEnvCmd] = useState(false);

  // Local backend server state
  const [isServerRunning, setIsServerRunning] = useState(false);
  const [isCheckingServer, setIsCheckingServer] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  const [batchResult, setBatchResult] = useState(null);
  const [generationError, setGenerationError] = useState(null);

  const checkServerStatus = async () => {
    setIsCheckingServer(true);
    try {
      const res = await fetch('http://localhost:5050/api/health', { method: 'GET' });
      if (res.ok) {
        setIsServerRunning(true);
      } else {
        setIsServerRunning(false);
      }
    } catch {
      setIsServerRunning(false);
    } finally {
      setIsCheckingServer(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkServerStatus();
      setGenerationResult(null);
      setGenerationError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedPreset = TOPIC_PRESETS.find(p => p.id === selectedTopicId) || TOPIC_PRESETS[0];

  const getCustomConfigJson = () => {
    const opNames = { '+': 'Addition', '-': 'Subtraction', '*': 'Multiplication', '×': 'Multiplication', '/': 'Division', '÷': 'Division' };
    const opName = opNames[currentConfig.operator || '+'] || 'Math';
    const minVal = currentConfig.minVal ?? 1;
    const maxVal = currentConfig.maxVal ?? 10;
    const op = currentConfig.operator || '+';
    const maxSum = (op === '+' || op === 'Addition') ? maxVal * 2 : maxVal;
    
    const topicId = `custom-${opName.toLowerCase()}-${minVal}-to-${maxVal}`;

    return {
      id: topicId,
      title: `${opName} Practice (${minVal}-${maxVal})`,
      subtitle: "Custom Elementary Math Practice",
      author: "Attapol.k",
      footer: currentConfig.copyrightText || "Created by Attapol.k · For classroom or home use",
      grade: "Grade 1-2",
      operation: op,
      missing_part: currentConfig.missingPart || "none",
      operand_min: minVal,
      operand_max: maxVal,
      max_sum: maxSum,
      items_per_page: currentConfig.problemCount || 12,
      num_versions: 5,
      theme: {
        primary_color: "#4C4592",
        secondary_color: "#666666",
        font_family: "'Mali', sans-serif",
        card_border: "#C4C0E5",
        answer_key_bg: "#EBF7ED",
        answer_key_border: "#A3E0B2",
        answer_key_text: "#2E7D32"
      },
      cover: {
        pill_text: `${opName} ${minVal}-${maxVal} • Fact Fluency`
      },
      tpt_listing: {
        title: `${opName} ${minVal}-${maxVal} Worksheets & Answer Keys Bundle`,
        bullet_points: [
          "5 unique randomized worksheet versions + 5 matching answer keys",
          "Clean print-ready layout",
          "Includes complete Terms of Use and merged PDF bundle"
        ],
        description: `Custom ${opName} practice worksheets for math fact fluency.`,
        keywords: [opName, "Math Fluency", "Worksheet Bundle", "Elementary Math"]
      }
    };
  };

  const commandStr = `python generator.py ${selectedPreset.path}`;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(commandStr);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  const handleCopyEnvCommand = () => {
    const envCmd = "pip install pypdf playwright && playwright install";
    navigator.clipboard.writeText(envCmd);
    setCopiedEnvCmd(true);
    setTimeout(() => setCopiedEnvCmd(false), 2500);
  };

  const handleDownloadCustomJson = () => {
    const customConfig = getCustomConfigJson();
    const jsonStr = JSON.stringify(customConfig, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedTopicId === 'live-editor' ? `${customConfig.id}.json` : selectedPreset.path.replace('topics/', '');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRunGenerator = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    setGenerationResult(null);

    const payload = selectedTopicId === 'live-editor'
      ? getCustomConfigJson()
      : { topicPath: selectedPreset.path };

    try {
      const res = await fetch('http://localhost:5050/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setGenerationError(data.error || 'Generator process failed.');
      } else {
        setGenerationResult(data);
      }
    } catch {
      setGenerationError(`Couldn't connect to server at http://localhost:5050. Please make sure "npm run server" is running.`);
      setIsServerRunning(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRunBatchGenerator = async () => {
    setIsBatchGenerating(true);
    setGenerationError(null);
    setBatchResult(null);

    try {
      const res = await fetch('http://localhost:5050/api/batch-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setGenerationError(data.error || 'Batch generator process failed.');
      } else {
        setBatchResult(data);
      }
    } catch {
      setGenerationError(`Couldn't connect to server at http://localhost:5050. Please make sure "npm run server" is running.`);
      setIsServerRunning(false);
    } finally {
      setIsBatchGenerating(false);
    }
  };


  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        animation: 'modalFadeIn 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Terminal size={24} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                Python TPT Generator CLI & Runner
              </h3>
              <p style={{ margin: 0, fontSize: '0.825rem', opacity: 0.9 }}>
                Generate complete TPT bundles (Worksheets, Keys, Cover PNG, ZIP & Listing)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Server status banner */}
          <div style={{
            padding: '10px 14px',
            borderRadius: '8px',
            background: isServerRunning ? '#f0fdf4' : '#fffbebe6',
            border: `1px solid ${isServerRunning ? '#bbf7d0' : '#fde68a'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isServerRunning ? '#15803d' : '#b45309' }}>
              <span style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: isServerRunning ? '#22c55e' : '#f59e0b',
                display: 'inline-block'
              }} />
              {isServerRunning ? (
                <span><strong>Local Generator Server Ready</strong> (http://localhost:5050)</span>
              ) : (
                <span><strong>Server Offline</strong> — Run <code style={{ background: '#fef3c7', padding: '2px 4px', borderRadius: '4px' }}>npm run server</code> to enable direct execution</span>
              )}
            </div>
            <button
              onClick={checkServerStatus}
              disabled={isCheckingServer}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6366f1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <Refresh size={14} className={isCheckingServer ? 'spin' : ''} /> {isCheckingServer ? 'Checking...' : 'Check Status'}
            </button>
          </div>

          {/* Topic Configuration Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
              Select Topic Configuration File (.json):
            </label>
            <select 
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.925rem',
                fontWeight: 500,
                color: '#1e293b',
                backgroundColor: '#f8fafc',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {TOPIC_PRESETS.map(preset => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
                </option>
              ))}
            </select>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
              {selectedPreset.description}
            </p>
          </div>

          {selectedTopicId === 'live-editor' && (
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileCode size={22} color="#16a34a" />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#15803d' }}>
                    Custom Editor JSON Ready
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#166534' }}>
                    Save this JSON file inside your <code style={{ background: '#dcfce7', padding: '2px 4px', borderRadius: '4px' }}>topics/</code> folder or run directly below.
                  </div>
                </div>
              </div>
              <button 
                onClick={handleDownloadCustomJson}
                className="btn"
                style={{
                  background: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 14px',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                <Download size={16} /> Save JSON File
              </button>
            </div>
          )}

          {/* Action Runner Button */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>
                Option 1: Direct Execution (Local Backend)
              </span>
            </div>
            
            {/* Single topic runner */}
            <button
              onClick={handleRunGenerator}
              disabled={isGenerating || isBatchGenerating || !isServerRunning}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: isServerRunning ? '#7c3aed' : '#94a3b8',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: (isGenerating || isBatchGenerating || !isServerRunning) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isServerRunning ? '0 4px 12px rgba(124, 58, 237, 0.25)' : 'none',
                transition: 'all 0.2s',
                marginBottom: '10px'
              }}
            >
              <PlayerPlay size={20} />
              {isGenerating ? 'Generating TPT Bundle Pipeline...' : isServerRunning ? `Run Selected Topic (${selectedPreset.label})` : 'Start Server First (npm run server)'}
            </button>

            {/* Fast Batch Runner */}
            <button
              onClick={handleRunBatchGenerator}
              disabled={isGenerating || isBatchGenerating || !isServerRunning}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: isServerRunning ? 'linear-gradient(135deg, #059669 0%, #0d9488 100%)' : '#94a3b8',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: (isGenerating || isBatchGenerating || !isServerRunning) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isServerRunning ? '0 4px 12px rgba(13, 148, 136, 0.3)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <Package size={20} />
              {isBatchGenerating ? '⚡ Running Fast Parallel Batch (All Best Sellers)...' : '⚡ Run Fast Batch (All Best-Selling Topics)'}
            </button>

            {generationError && (
              <div style={{ marginTop: '12px', padding: '10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#991b1b', fontSize: '0.825rem' }}>
                ❌ <strong>Error:</strong> {generationError}
              </div>
            )}

            {generationResult && (
              <div style={{ marginTop: '12px', padding: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '6px' }}>✅ Single Bundle Generated Successfully!</div>
                <div style={{ marginBottom: '8px', fontSize: '0.8rem' }}>Output folder: <code>{generationResult.outputDir}</code></div>
                <button
                  onClick={() => window.open(`http://localhost:5050${generationResult.zipUrl}`, '_blank')}
                  style={{
                    background: '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={16} /> Download ZIP Bundle ({generationResult.topicId}-tpt-bundle.zip)
                </button>
              </div>
            )}

            {batchResult && (
              <div style={{ marginTop: '12px', padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '6px' }}>⚡ Batch Generation Completed! ({batchResult.count} Bundles Ready)</div>
                <div style={{ fontSize: '0.8rem', color: '#15803d', marginBottom: '10px' }}>All best-selling math topic ZIP packages are ready in <code>output/</code></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
                  {batchResult.zipFiles.map(z => (
                    <div key={z.topicId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '6px 10px', borderRadius: '6px', border: '1px solid #dcfce7' }}>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>📦 {z.topicId}</span>
                      <button
                        onClick={() => window.open(`http://localhost:5050${z.zipUrl}`, '_blank')}
                        style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Download size={12} /> Download ZIP
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Terminal Command Output */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                Option 2: Terminal CLI Command (Manual Run)
              </span>
              {copiedCmd && (
                <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={14} /> Command Copied!
                </span>
              )}
            </div>

            <div style={{
              background: '#0f172a',
              borderRadius: '10px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              fontSize: '0.9rem',
              color: '#38bdf8',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
              border: '1px solid #1e293b'
            }}>
              <span style={{ wordBreak: 'break-all', userSelect: 'all' }}>
                {commandStr}
              </span>
              <button 
                onClick={handleCopyCommand}
                style={{
                  background: copiedCmd ? '#16a34a' : '#334155',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginLeft: '12px',
                  transition: 'background 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCmd ? <Check size={14} /> : <Copy size={14} />}
                {copiedCmd ? 'Copied' : 'Copy Command'}
              </button>
            </div>
          </div>

          {/* What Python Pipeline Generates */}
          <div style={{
            background: '#faf5ff',
            border: '1px solid #e9d5ff',
            borderRadius: '10px',
            padding: '14px 16px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: '#6b21a8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Package size={18} /> Output Products Generated:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem', color: '#581c87' }}>
              <div>• 5 Worksheet PDFs (+ TOU)</div>
              <div>• 5 Answer Key PDFs (+ TOU)</div>
              <div>• Merged Complete PDF Bundle</div>
              <div>• 1200×1200 Square Cover PNG</div>
              <div>• TPT SEO Listing Text (listing.md)</div>
              <div>• Upload-Ready ZIP Package</div>
            </div>
          </div>

          {/* Setup / Prerequisites Guide */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={16} /> Environment Requirements & Setup:
              </span>
              <button
                onClick={handleCopyEnvCommand}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#6366f1',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {copiedEnvCmd ? <Check size={12} /> : <Copy size={12} />}
                {copiedEnvCmd ? 'Copied Setup Cmd' : 'Copy Setup Cmd'}
              </button>
            </div>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.8rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Open PowerShell / Terminal in project folder</li>
              <li>Install dependencies: <code style={{ background: '#e2e8f0', padding: '1px 5px', borderRadius: '4px', color: '#0f172a' }}>pip install pypdf playwright</code></li>
              <li>Install headless browser: <code style={{ background: '#e2e8f0', padding: '1px 5px', borderRadius: '4px', color: '#0f172a' }}>playwright install</code></li>
              <li>Start local runner backend (optional): <code style={{ background: '#e2e8f0', padding: '1px 5px', borderRadius: '4px', color: '#0f172a' }}>npm run server</code></li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Output files saved to <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>output/&lt;topic-id&gt;/</code>
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={onClose}
              className="btn"
              style={{
                background: '#e2e8f0',
                color: '#334155',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
