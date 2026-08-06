import React, { useState, useEffect, useMemo } from 'react';
import IconBolt from '@tabler/icons-react/dist/esm/icons/IconBolt.mjs';
import IconCheckbox from '@tabler/icons-react/dist/esm/icons/IconCheckbox.mjs';
import IconBook from '@tabler/icons-react/dist/esm/icons/IconBook.mjs';
import IconCalendar from '@tabler/icons-react/dist/esm/icons/IconCalendar.mjs';
import IconCurrencyDollar from '@tabler/icons-react/dist/esm/icons/IconCurrencyDollar.mjs';
import IconArrowRight from '@tabler/icons-react/dist/esm/icons/IconArrowRight.mjs';
import IconRefresh from '@tabler/icons-react/dist/esm/icons/IconRefresh.mjs';
import IconAward from '@tabler/icons-react/dist/esm/icons/IconAward.mjs';
import IconStack from '@tabler/icons-react/dist/esm/icons/IconStack.mjs';
import IconRocket from '@tabler/icons-react/dist/esm/icons/IconRocket.mjs';
import IconPlus from '@tabler/icons-react/dist/esm/icons/IconPlus.mjs';
import IconDownload from '@tabler/icons-react/dist/esm/icons/IconDownload.mjs';
import IconUpload from '@tabler/icons-react/dist/esm/icons/IconUpload.mjs';
import IconTrash from '@tabler/icons-react/dist/esm/icons/IconTrash.mjs';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const PRESET_CATEGORIES = [
  {
    id: 'seasonal',
    title: '🎉 Seasonal & Holiday Favorites',
    presets: [
      {
        id: 'st_pats_10',
        icon: '☘️',
        title: "St. Patrick's Addition within 10",
        season: 'March (Prep in Jan/Feb)',
        grade: 'K - Grade 1',
        topicName: 'Basic Addition',
        desc: 'Top seller for March! Single-digit addition within 10 with shamrock & pot-of-gold theme.',
        themeCategory: "☘️ St. Patrick's (10)",
        config: { topic: 'basic_math', operator: '+', minVal: 1, maxVal: 10, problemCount: 10 }
      },
      {
        id: 'day_100',
        icon: '💯',
        title: '100th Day Missing Numbers (1-20)',
        season: 'Jan/Feb (Prep in Dec/Jan)',
        grade: 'Kindergarten',
        topicName: 'Missing Numbers',
        desc: 'Huge demand in Feb! Sequence completion for 100th day of school celebration.',
        themeCategory: '💯 100th Day of School (10)',
        config: { topic: 'missing_number', minVal: 1, maxVal: 20, problemCount: 10, sequenceLength: 10 }
      },
      {
        id: 'spring_bonds',
        icon: '🌸',
        title: 'Spring Number Bonds of 10',
        season: 'April (Prep in Feb/Mar)',
        grade: 'Grade 1',
        topicName: 'Number Bonds',
        desc: 'Essential for Common Core fluency. Part-part-whole decomposition.',
        themeCategory: '🌸 Nature',
        config: { topic: 'number_bond', minVal: 1, maxVal: 10, problemCount: 10 }
      },
      {
        id: 'summer_slide',
        icon: '☀️',
        title: 'Summer Slide Subtraction Review',
        season: 'May/June (Prep in Mar/Apr)',
        grade: 'Grade 1 - Grade 2',
        topicName: 'Basic Subtraction',
        desc: 'Parents & teachers buy these in May for end-of-year take-home packets.',
        themeCategory: '🚀 Summer & Space (10)',
        config: { topic: 'basic_math', operator: '-', minVal: 1, maxVal: 20, problemCount: 10 }
      },
      {
        id: 'bts_frames',
        icon: '🎒',
        title: 'Back to School Ten Frames',
        season: 'August (Prep in May/June)',
        grade: 'Pre-K & Kindergarten',
        topicName: 'Ten Frames',
        desc: 'Peak season seller! Visual subitizing & counting practice for early math.',
        themeCategory: '🎒 Back to School (10)',
        config: { topic: 'ten_frame', minVal: 1, maxVal: 10, problemCount: 10 }
      },
      {
        id: 'halloween_missing',
        icon: '🎃',
        title: 'Halloween Missing Addends ([ ] + B = C)',
        season: 'October (Prep in July/Aug)',
        grade: 'Grade 1 - Grade 2',
        topicName: 'Missing Addend',
        desc: 'High search volume topic for October math centers.',
        themeCategory: '🎃 Halloween (10)',
        config: { topic: 'basic_math', operator: '+', minVal: 1, maxVal: 10, problemCount: 10, missingPart: 'first' }
      },
      {
        id: 'thanksgiving_compare',
        icon: '🦃',
        title: 'Thanksgiving Ten Frame Comparison',
        season: 'November (Prep in Aug/Sept)',
        grade: 'K - Grade 1',
        topicName: 'Ten Frame Compare (<, >, =)',
        desc: 'Interactive comparison worksheets for November math stations.',
        themeCategory: '🦃 Thanksgiving (10)',
        config: { topic: 'ten_frame_comparison', minVal: 1, maxVal: 10, problemCount: 10 }
      },
      {
        id: 'winter_word_prob',
        icon: '❄️',
        title: 'Winter Math Word Problems',
        season: 'December/January',
        grade: 'Grade 1',
        topicName: 'Word Problems',
        desc: 'Story problems featuring snowmen, mittens, and winter themes.',
        themeCategory: '❄️ Winter (10)',
        config: { topic: 'word_problem', minVal: 1, maxVal: 15, problemCount: 5 }
      }
    ]
  },
  {
    id: 'evergreen',
    title: '⭐ Evergreen High-Demand Formats',
    presets: [
      {
        id: 'exit_tickets',
        icon: '🎟️',
        title: '5-Minute Math Exit Tickets',
        season: 'All Year Round',
        grade: 'K - Grade 2',
        topicName: 'Quick Assessment',
        desc: 'Teachers love fast 5-minute assessments to check concept mastery.',
        themeCategory: '📐 Math & Tools',
        config: { topic: 'basic_math', operator: '+', minVal: 1, maxVal: 10, problemCount: 10 }
      },
      {
        id: 'valentine_double_digit',
        icon: '💕',
        title: 'Valentine 2-Digit Addition (No Carry)',
        season: 'February (Prep in Nov/Dec)',
        grade: 'Grade 1 - Grade 2',
        topicName: '2-Digit Addition',
        desc: 'Double-digit practice without regrouping for middle of 1st Grade.',
        themeCategory: '💕 Valentine (10)',
        config: { topic: 'basic_math', operator: '+', minVal: 10, maxVal: 50, allowCarryBorrow: false, problemCount: 10 }
      },
      {
        id: 'easter_line_jump',
        icon: '🐣',
        title: 'Easter Number Line Jump (+)',
        season: 'March/April',
        grade: 'K - Grade 1',
        topicName: 'Number Line Addition',
        desc: 'Visual hopping on a number line for addition fluency.',
        themeCategory: '🐣 Easter (10)',
        config: { topic: 'number_line', minVal: 1, maxVal: 10, problemCount: 10 }
      }
    ]
  }
];

const DEFAULT_CHECKLIST = [
  { id: 'theme', label: 'Select Target Topic & Grade Level', done: false },
  { id: 'pages', label: 'Generate 10-15 Unique Worksheet Pages', done: false },
  { id: 'answer_key', label: 'Generate & Include Answer Key overlay', done: false },
  { id: 'cover', label: 'Create Product Cover in Cover Generator', done: false },
  { id: 'pdf', label: 'Export PDF Bundle', done: false },
  { id: 'tpt_listing', label: 'Copy Title & Keywords from TPT Helper', done: false }
];

const PACK_RECIPES = [
  {
    title: '📦 10-Page Mini Practice Pack',
    target: 'Single Skill Focus (e.g. Addition within 10)',
    price: '$2.50 – $3.00',
    bestFor: 'Daily morning work, fast finishers, quick review packets.',
    pages: 10,
    presetId: 'st_pats_10'
  },
  {
    title: '📚 20-Page Unit Mastery Bundle',
    target: 'Complete Topic Unit (Addition + Subtraction + Word Problems)',
    price: '$4.50 – $5.50',
    bestFor: '2-week teaching unit, math stations, homework packets.',
    pages: 20,
    presetId: 'spring_bonds'
  },
  {
    title: '🏆 50-Page Mega Seasonal Math Bundle',
    target: 'Full Holiday or Seasonal Grade-Level Bundle',
    price: '$12.00 – $15.00',
    bestFor: 'High-ticket TPT store centerpiece & year-round sales.',
    pages: 50,
    presetId: 'summer_slide'
  }
];

export default function TrendPlanner({ onApplyPreset }) {
  const currentMonthIdx = new Date().getMonth();
  const suggestedTarget = (currentMonthIdx + 2) % 12; // 2 months lookahead
  
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'checklist' | 'recipes' | 'calendar'
  const [selectedTargetMonth, setSelectedTargetMonth] = useState(suggestedTarget);

  // Custom Presets State (localStorage)
  const [customPresets, setCustomPresets] = useState(() => {
    try {
      const saved = localStorage.getItem('math_planner_custom_presets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [newPresetForm, setNewPresetForm] = useState({
    title: '',
    icon: '✨',
    season: 'All Year Round',
    grade: 'K - Grade 2',
    topic: 'basic_math',
    operator: '+',
    minVal: 1,
    maxVal: 10,
    problemCount: 10,
    desc: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem('math_planner_custom_presets', JSON.stringify(customPresets));
    } catch (err) {
      console.error("Failed to save custom presets:", err);
    }
  }, [customPresets]);

  // All combined presets for lookup
  const allPresets = useMemo(() => {
    const defaultFlat = PRESET_CATEGORIES.flatMap(c => c.presets);
    return [...defaultFlat, ...customPresets];
  }, [customPresets]);

  // Product Pipeline State (Per-product checklist)
  const [pipelines, setPipelines] = useState(() => {
    try {
      const saved = localStorage.getItem('math_planner_pipelines');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { id: 'default', title: 'Main Product Bundle Pipeline', checklist: DEFAULT_CHECKLIST }
    ];
  });

  const [activePipelineId, setActivePipelineId] = useState('default');

  useEffect(() => {
    try {
      localStorage.setItem('math_planner_pipelines', JSON.stringify(pipelines));
    } catch (err) {
      console.error("Failed to save pipelines:", err);
    }
  }, [pipelines]);

  // Current active pipeline
  const activePipeline = useMemo(() => {
    return pipelines.find(p => p.id === activePipelineId) || pipelines[0];
  }, [pipelines, activePipelineId]);

  // Migration helper for active checklist items
  const currentChecklist = useMemo(() => {
    const loaded = activePipeline.checklist || DEFAULT_CHECKLIST;
    const savedMap = new Map(loaded.map(item => [item.id, item.done]));
    return DEFAULT_CHECKLIST.map(def => ({
      ...def,
      done: savedMap.has(def.id) ? savedMap.get(def.id) : def.done
    }));
  }, [activePipeline]);

  const toggleChecklistItem = (itemId) => {
    setPipelines(prev => prev.map(pipeline => {
      if (pipeline.id !== activePipeline.id) return pipeline;
      const updatedChecklist = currentChecklist.map(item =>
        item.id === itemId ? { ...item, done: !item.done } : item
      );
      return { ...pipeline, checklist: updatedChecklist };
    }));
  };

  const resetChecklist = () => {
    setPipelines(prev => prev.map(pipeline => {
      if (pipeline.id !== activePipeline.id) return pipeline;
      return { ...pipeline, checklist: DEFAULT_CHECKLIST };
    }));
  };

  const addPipeline = (title) => {
    const newId = `pipe_${Date.now()}`;
    const newPipe = { id: newId, title, checklist: DEFAULT_CHECKLIST };
    setPipelines(prev => [...prev, newPipe]);
    setActivePipelineId(newId);
  };

  const deletePipeline = (id) => {
    if (pipelines.length <= 1) return;
    setPipelines(prev => prev.filter(p => p.id !== id));
    setActivePipelineId(pipelines[0].id);
  };

  const completedCount = currentChecklist.filter(c => c.done).length;
  const progressPercent = Math.round((completedCount / currentChecklist.length) * 100);

  const currentMonthName = MONTHS[currentMonthIdx];
  const targetMonthName = MONTHS[selectedTargetMonth];

  // Presets matching selected target month for Seasonal Lookahead Calendar
  const seasonalMatchingPresets = useMemo(() => {
    const monthShort = targetMonthName.substring(0, 3).toLowerCase();
    const monthFull = targetMonthName.toLowerCase();
    
    return allPresets.filter(p => {
      if (!p.season) return false;
      const s = p.season.toLowerCase();
      return s.includes(monthFull) || s.includes(monthShort);
    });
  }, [allPresets, targetMonthName]);

  const handleLaunchPreset = (preset) => {
    if (onApplyPreset) {
      onApplyPreset(preset);
    }
  };

  const handleAddCustomPreset = (e) => {
    e.preventDefault();
    if (!newPresetForm.title.trim()) return;
    
    const newPreset = {
      id: `custom_${Date.now()}`,
      icon: newPresetForm.icon || '✨',
      title: newPresetForm.title.trim(),
      season: newPresetForm.season || 'All Year Round',
      grade: newPresetForm.grade || 'K - Grade 2',
      topicName: newPresetForm.topic,
      desc: newPresetForm.desc || 'Custom saved preset.',
      isCustom: true,
      config: {
        topic: newPresetForm.topic,
        operator: newPresetForm.operator,
        minVal: Number(newPresetForm.minVal),
        maxVal: Number(newPresetForm.maxVal),
        problemCount: Number(newPresetForm.problemCount)
      }
    };

    setCustomPresets(prev => [...prev, newPreset]);
    setShowAddCustomModal(false);
    setNewPresetForm({
      title: '',
      icon: '✨',
      season: 'All Year Round',
      grade: 'K - Grade 2',
      topic: 'basic_math',
      operator: '+',
      minVal: 1,
      maxVal: 10,
      problemCount: 10,
      desc: ''
    });
  };

  const handleDeleteCustomPreset = (id) => {
    setCustomPresets(prev => prev.filter(p => p.id !== id));
  };

  const handleExportPresetsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customPresets, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `custom_math_presets_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportPresetsJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          setCustomPresets(prev => [...prev, ...imported]);
          alert(`Successfully imported ${imported.length} custom presets!`);
        }
      } catch (err) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
        borderRadius: '16px', padding: '24px 28px', color: 'white',
        boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IconRocket size={26} /> TPT & Etsy Math Product Planner
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '6px', maxWidth: '600px', lineHeight: 1.5 }}>
              Plan, build, and launch high-converting math worksheet bundles 6–8 weeks ahead of seasonal rush. Click any <strong>⚡ Launch Preset</strong> to pre-configure your generator in 1 click!
            </div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', padding: '10px 16px', borderRadius: '12px', textAlign: 'right', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8, fontWeight: 700 }}>CURRENT MONTH</div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{currentMonthName}</div>
            <div style={{ fontSize: '12px', marginTop: '2px', color: '#fef08a', fontWeight: 600 }}>Target Launch: {MONTHS[suggestedTarget]}</div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--color-border)', paddingBottom: '2px', flexWrap: 'wrap' }}>
        {[
          { id: 'presets', label: '⚡ 1-Click Launch Presets', icon: IconBolt },
          { id: 'checklist', label: `📋 Bundle Pipeline (${completedCount}/${currentChecklist.length})`, icon: IconCheckbox },
          { id: 'recipes', label: '📦 Product Blueprints & Pricing', icon: IconBook },
          { id: 'calendar', label: '📅 Seasonal Lookahead Calendar', icon: IconCalendar },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                border: 'none', background: 'transparent', cursor: 'pointer',
                fontWeight: isActive ? 700 : 500, fontSize: '14px',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                marginBottom: '-2px', transition: 'all 0.15s ease'
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: 1-CLICK LAUNCH PRESETS */}
      {activeTab === 'presets' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Custom Presets Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: 'white', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-text-main)' }}>
              ⭐ Custom & Saved Presets ({customPresets.length})
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => setShowAddCustomModal(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                <IconPlus size={14} /> Add Custom Preset
              </button>
              <button
                onClick={handleExportPresetsJSON}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                title="Export Custom Presets to JSON"
              >
                <IconDownload size={14} /> Export JSON
              </button>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                title="Import Custom Presets from JSON"
              >
                <IconUpload size={14} /> Import JSON
                <input type="file" accept=".json" onChange={handleImportPresetsJSON} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* Render Custom Presets if any */}
          {customPresets.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🌟 Your Saved Custom Presets
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
                {customPresets.map(p => (
                  <div
                    key={p.id}
                    className="planner-card"
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '28px' }}>{p.icon}</span>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span className="badge-chip">{p.grade}</span>
                          <button
                            onClick={() => handleDeleteCustomPreset(p.id)}
                            style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                            title="Delete Preset"
                          >
                            <IconTrash size={15} />
                          </button>
                        </div>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', marginBottom: '4px' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6366f1', fontWeight: 600, marginBottom: '8px' }}>
                        📅 Season: {p.season}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                        {p.desc}
                      </div>
                    </div>

                    <button
                      onClick={() => handleLaunchPreset(p)}
                      style={{
                        width: '100%', padding: '10px 14px',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                        color: 'white', border: 'none', borderRadius: '8px',
                        fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
                      }}
                    >
                      <IconBolt size={15} /> Launch Custom Preset <IconArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render Default Preset Categories */}
          {PRESET_CATEGORIES.map(cat => (
            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {cat.title}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
                {cat.presets.map(p => (
                  <div
                    key={p.id}
                    className="planner-card"
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '28px' }}>{p.icon}</span>
                        <span className="badge-chip">{p.grade}</span>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', marginBottom: '4px' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6366f1', fontWeight: 600, marginBottom: '8px' }}>
                        📅 Peak Buying: {p.season}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                        {p.desc}
                      </div>
                    </div>

                    <button
                      onClick={() => handleLaunchPreset(p)}
                      style={{
                        width: '100%', padding: '10px 14px',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                        color: 'white', border: 'none', borderRadius: '8px',
                        fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)', transition: 'transform 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <IconBolt size={15} /> Launch Preset in Generator <IconArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: INTERACTIVE BUNDLE PIPELINE & CHECKLIST */}
      {activeTab === 'checklist' && (
        <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--color-border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Pipeline Selector / Multi-Product Manager */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label htmlFor="pipeline-select" style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Active Product Pipeline:</label>
              <select
                id="pipeline-select"
                value={activePipelineId}
                onChange={(e) => setActivePipelineId(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: 600, background: 'white' }}
              >
                {pipelines.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => {
                  const title = prompt("Enter new product bundle title:");
                  if (title) addPipeline(title);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                <IconPlus size={14} /> New Product Pipeline
              </button>
              {pipelines.length > 1 && (
                <button
                  onClick={() => deletePipeline(activePipelineId)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  <IconTrash size={14} /> Delete
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>📋 {activePipeline.title} Checklist</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                Track your product creation steps from initial math setup to exporting and TPT listing.
              </div>
            </div>
            <button
              onClick={resetChecklist}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
            >
              <IconRefresh size={14} /> Reset Checklist
            </button>
          </div>

          {/* Progress Bar */}
          <div style={{ background: '#f1f5f9', borderRadius: '10px', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: '#334155' }}>
              <span>Bundle Progress ({completedCount} of {currentChecklist.length} completed)</span>
              <span>{progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', transition: 'width 0.3s ease' }} />
            </div>
          </div>

          {/* Checklist Items with Keyboard & Accessibility Fix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentChecklist.map((item, idx) => (
              <button
                type="button"
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                aria-pressed={item.done}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                  borderRadius: '10px', border: '1px solid', cursor: 'pointer', textAlign: 'left',
                  background: item.done ? '#f0fdf4' : '#fff',
                  borderColor: item.done ? '#bbf7d0' : '#e2e8f0',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  width: '22px', height: '22px', borderRadius: '6px', border: '2px solid',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderColor: item.done ? '#16a34a' : '#cbd5e1',
                  background: item.done ? '#16a34a' : 'transparent',
                  color: 'white'
                }}>
                  {item.done && <IconCheckbox size={14} />}
                </div>
                <div style={{ flex: 1, fontSize: '14px', fontWeight: item.done ? 600 : 500, color: item.done ? '#15803d' : '#334155', textDecoration: item.done ? 'line-through' : 'none' }}>
                  {idx + 1}. {item.label}
                </div>
              </button>
            ))}
          </div>

          {progressPercent === 100 && (
            <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', color: '#047857' }}>
              <IconAward size={24} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '15px' }}>🎉 Product Bundle Ready for Launch!</div>
                <div style={{ fontSize: '13px', marginTop: '2px' }}>Your worksheet pages, answer key, cover, and listing copy are complete. Upload to TPT/Etsy now!</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PRODUCT BLUEPRINTS & PRICING */}
      {activeTab === 'recipes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>
            Proven TPT product structures that maximize customer satisfaction and revenue. Select a blueprint to start building:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {PACK_RECIPES.map((recipe, idx) => (
              <div key={idx} className="planner-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '17px', color: '#0f172a', marginBottom: '6px' }}>{recipe.title}</div>
                  <div className="badge-chip success" style={{ marginBottom: '12px' }}>
                    <IconCurrencyDollar size={13} /> Recommended Price: {recipe.price}
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', marginBottom: '6px' }}><strong>Scope:</strong> {recipe.target}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}><strong>Ideal For:</strong> {recipe.bestFor}</div>
                </div>

                <button
                  onClick={() => {
                    const preset = allPresets.find(p => p.id === recipe.presetId) || allPresets[0];
                    handleLaunchPreset(preset);
                  }}
                  style={{ width: '100%', padding: '10px', background: '#1e293b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <IconStack size={15} /> Start {recipe.pages}-Page Blueprint <IconArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SEASONAL LOOKAHEAD CALENDAR */}
      {activeTab === 'calendar' && (
        <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--color-border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <label htmlFor="target-month-select" style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
              Select Target Sales Month:
            </label>
            <select
              id="target-month-select"
              value={selectedTargetMonth}
              onChange={(e) => setSelectedTargetMonth(parseInt(e.target.value))}
              style={{ padding: '8px 14px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px', fontWeight: 700, color: '#1e293b', outline: 'none', background: 'white' }}
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i}>
                  {m} {i === suggestedTarget ? '(Suggested 6-8 Wks Out)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '18px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 800, fontSize: '16px', color: '#1e293b', marginBottom: '8px' }}>
              🎯 What Teachers Are Buying in {targetMonthName}:
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
              TPT data shows that teachers search and purchase seasonal resources <strong>4 to 8 weeks before</strong> the holiday or month begins. Building and uploading your products during {MONTHS[(selectedTargetMonth + 10) % 12]} ensures maximum search indexing and early reviews!
            </div>
          </div>

          {/* Connected Seasonal Presets Recommendation Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontWeight: 800, fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚡ Recommended Presets to Start Building for {targetMonthName} ({seasonalMatchingPresets.length}):
            </div>
            {seasonalMatchingPresets.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                {seasonalMatchingPresets.map(p => (
                  <div key={p.id} className="planner-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '24px' }}>{p.icon}</span>
                        <div style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a' }}>{p.title}</div>
                      </div>
                      <div style={{ fontSize: '12px', color: '#475569', marginBottom: '6px' }}>{p.desc}</div>
                      <div className="badge-chip primary">{p.season}</div>
                    </div>
                    <button
                      onClick={() => handleLaunchPreset(p)}
                      style={{ width: '100%', padding: '8px 12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                    >
                      <IconBolt size={14} /> Launch in Generator
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', fontSize: '13px', color: '#64748b' }}>
                No specific seasonal preset tagged for {targetMonthName} yet. Try launching an evergreen preset or create a Custom Preset!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Adding Custom Preset */}
      {showAddCustomModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>✨ Create Custom Preset</div>
            <form onSubmit={handleAddCustomPreset} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Preset Title *</label>
                <input
                  type="text" required
                  placeholder="e.g. Summer Addition Challenge"
                  value={newPresetForm.title}
                  onChange={e => setNewPresetForm({ ...newPresetForm, title: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={newPresetForm.icon}
                    onChange={e => setNewPresetForm({ ...newPresetForm, icon: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Season / Month</label>
                  <input
                    type="text"
                    value={newPresetForm.season}
                    onChange={e => setNewPresetForm({ ...newPresetForm, season: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Topic</label>
                  <select
                    value={newPresetForm.topic}
                    onChange={e => setNewPresetForm({ ...newPresetForm, topic: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="basic_math">Basic Arithmetic</option>
                    <option value="missing_number">Missing Numbers</option>
                    <option value="number_bond">Number Bonds</option>
                    <option value="ten_frame">Ten Frames</option>
                    <option value="ten_frame_comparison">Ten Frame Compare</option>
                    <option value="number_line">Number Line</option>
                    <option value="word_problem">Word Problem</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Operator</label>
                  <select
                    value={newPresetForm.operator}
                    onChange={e => setNewPresetForm({ ...newPresetForm, operator: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="+">Addition (+)</option>
                    <option value="-">Subtraction (-)</option>
                    <option value="*">Multiplication (×)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Min Val</label>
                  <input
                    type="number"
                    value={newPresetForm.minVal}
                    onChange={e => setNewPresetForm({ ...newPresetForm, minVal: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Max Val</label>
                  <input
                    type="number"
                    value={newPresetForm.maxVal}
                    onChange={e => setNewPresetForm({ ...newPresetForm, maxVal: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Problems</label>
                  <input
                    type="number"
                    value={newPresetForm.problemCount}
                    onChange={e => setNewPresetForm({ ...newPresetForm, problemCount: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Description</label>
                <textarea
                  value={newPresetForm.desc}
                  onChange={e => setNewPresetForm({ ...newPresetForm, desc: e.target.value })}
                  placeholder="Short description for this preset..."
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', minHeight: '60px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                >
                  Save Preset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
