import React, { useState, useEffect } from 'react';
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

  // Persistent checklist state
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('math_planner_checklist');
      return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
    } catch {
      return DEFAULT_CHECKLIST;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('math_planner_checklist', JSON.stringify(checklist));
    } catch (err) {
      console.error("Failed to save checklist:", err);
    }
  }, [checklist]);

  const toggleChecklistItem = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const resetChecklist = () => {
    setChecklist(DEFAULT_CHECKLIST);
  };

  const completedCount = checklist.filter(c => c.done).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const currentMonthName = MONTHS[currentMonthIdx];
  const targetMonthName = MONTHS[selectedTargetMonth];

  const handleLaunchPreset = (preset) => {
    if (onApplyPreset) {
      onApplyPreset(preset);
    }
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
            <div style={{ fontSize: '11px', textTransform: 'uppercase', tracking: '0.05em', opacity: 0.8, fontWeight: 700 }}>CURRENT MONTH</div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{currentMonthName}</div>
            <div style={{ fontSize: '12px', marginTop: '2px', color: '#fef08a', fontWeight: 600 }}>Target Launch: {MONTHS[suggestedTarget]}</div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '2px' }}>
        {[
          { id: 'presets', label: '⚡ 1-Click Launch Presets', icon: IconBolt },
          { id: 'checklist', label: `📋 Bundle Pipeline (${completedCount}/${checklist.length})`, icon: IconCheckbox },
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
                color: isActive ? '#4f46e5' : '#64748b',
                borderBottom: isActive ? '3px solid #4f46e5' : '3px solid transparent',
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
          {PRESET_CATEGORIES.map(cat => (
            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {cat.title}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
                {cat.presets.map(p => (
                  <div
                    key={p.id}
                    style={{
                      background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0',
                      padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '28px' }}>{p.icon}</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '20px', background: '#f1f5f9', color: '#475569' }}>
                          {p.grade}
                        </span>
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
        <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>📋 Active Product Bundle Pipeline</div>
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
              <span>Bundle Progress ({completedCount} of {checklist.length} completed)</span>
              <span>{progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', transition: 'width 0.3s ease' }} />
            </div>
          </div>

          {/* Checklist Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {checklist.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                  borderRadius: '10px', border: '1px solid', cursor: 'pointer',
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
              </div>
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
              <div key={idx} style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '17px', color: '#0f172a', marginBottom: '6px' }}>{recipe.title}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>
                    <IconCurrencyDollar size={13} /> Recommended Price: {recipe.price}
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', marginBottom: '6px' }}><strong>Scope:</strong> {recipe.target}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}><strong>Ideal For:</strong> {recipe.bestFor}</div>
                </div>

                <button
                  onClick={() => {
                    const preset = PRESET_CATEGORIES[0].presets.find(p => p.id === recipe.presetId) || PRESET_CATEGORIES[0].presets[0];
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
        <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>Select Target Sales Month:</div>
            <select
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
        </div>
      )}

    </div>
  );
}
