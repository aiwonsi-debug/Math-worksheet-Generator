import React, { useState } from 'react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const SEASONAL_TRENDS = {
  'January': [
    { title: "St. Patrick's Day", desc: "Teachers start buying for March. Leaping leprechauns, clovers, gold coins." },
    { title: "Spring / Easter", desc: "Early planners are looking for spring-themed math centers and phonics." },
    { title: "Test Prep", desc: "State testing is approaching. Spiral reviews and test prep bundles are hot." }
  ],
  'February': [
    { title: "Spring / Earth Day", desc: "Spring themes, Earth Day recycling math, planting seeds." },
    { title: "End of Year (Early)", desc: "Memory books, summer slide packets, end of year awards." }
  ],
  'March': [
    { title: "End of Year Review", desc: "Huge demand for summer packets, kindergarten readiness, and review worksheets." },
    { title: "Summer Themes", desc: "Beach, ocean, ice cream, and camping themed math/phonics." }
  ],
  'April': [
    { title: "Summer Slide Packets", desc: "Parents and teachers buy take-home packets for the summer break." },
    { title: "Back to School (Early)", desc: "Ultra-early planners looking for August/September resources." }
  ],
  'May': [
    { title: "Back to School", desc: "All about me, classroom decor, first day of school activities, baseline assessments." },
    { title: "Fall Themes", desc: "Apples, pumpkins, leaves, and autumn math centers." }
  ],
  'June': [
    { title: "Back to School (Peak)", desc: "The biggest season on TPT! Get your Back to School bundles ready." },
    { title: "Halloween (Early)", desc: "Start prepping October resources (bats, spiders, ghosts)." }
  ],
  'July': [
    { title: "Halloween / Fall", desc: "October resources are in high demand." },
    { title: "Thanksgiving", desc: "Turkeys, gratitude, and November themes." }
  ],
  'August': [
    { title: "Thanksgiving", desc: "November resources." },
    { title: "Christmas / Winter", desc: "December holidays, reindeer, snowmen, winter math." }
  ],
  'September': [
    { title: "Christmas / Winter", desc: "Peak buying for December holiday worksheets." },
    { title: "New Year / January", desc: "Goal setting, winter themes, Martin Luther King Jr. Day." }
  ],
  'October': [
    { title: "Winter / 100th Day", desc: "100th day of school activities are incredibly popular for Jan/Feb." },
    { title: "Valentine's Day", desc: "Hearts, friendship, and February themes." }
  ],
  'November': [
    { title: "Valentine's Day", desc: "February themes." },
    { title: "St. Patrick's Day (Early)", desc: "March themes." }
  ],
  'December': [
    { title: "Spring / Easter", desc: "March/April themes." },
    { title: "Test Prep", desc: "Getting ready for spring state testing." }
  ]
};

const HIGH_DEMAND_NICHES = [
  {
    icon: "🖍️",
    title: "Color by Code (Math Fact Fluency)",
    why: "Teachers love self-checking, independent activities. Students love coloring.",
    action: "Use the 'Add Image' tool to upload a B&W outline, then use 'Add Text' to place math problems inside the spaces."
  },
  {
    icon: "📖",
    title: "Decodable Math Word Problems",
    why: "K-2 teachers struggle to find word problems that students can actually read independently using phonics skills.",
    action: "Use the 'Word Problem' generator, then double-click the text to simplify the vocabulary to CVC/CVCe words."
  },
  {
    icon: "🧩",
    title: "Missing Addends / Number Bonds",
    why: "Crucial for common core standards, but textbooks don't provide enough practice.",
    action: "Use the 'Missing Numbers' and 'Number Bonds' generators to build 20-page mastery packets."
  },
  {
    icon: "🎟️",
    title: "Math Exit Tickets (Half-page)",
    why: "Teachers need quick, 5-minute assessments. Half-page prints save paper.",
    action: "Set your grid to 2 columns and 2 rows, draw a line down the middle, and create 4 exit tickets per page."
  }
];

function Section({ title, hint, children }) {
  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '12px 18px' }}>
        <div style={{ fontWeight: 700, fontSize: '15px', color: '#1e293b' }}>{title}</div>
        {hint && <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{hint}</div>}
      </div>
      <div style={{ padding: '16px 18px' }}>{children}</div>
    </div>
  );
}

export default function TrendPlanner() {
  const currentMonthIdx = new Date().getMonth();
  const defaultTarget = (currentMonthIdx + 2) % 12; // Look ahead 2 months
  
  const [selectedTarget, setSelectedTarget] = useState(defaultTarget);
  
  const currentMonthName = MONTHS[currentMonthIdx];
  const targetMonthName = MONTHS[selectedTarget];
  const trends = SEASONAL_TRENDS[targetMonthName];
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)', borderRadius: '14px', padding: '20px 24px', color: 'white' }}>
        <div style={{ fontSize: '20px', fontWeight: 800 }}>📈 TPT Trend & Niche Planner</div>
        <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '4px' }}>
          Find high-demand niches and plan your creations 2-3 months ahead of the seasonal rush.
        </div>
      </div>

      <Section title="1. Seasonal Lookahead (6-8 Weeks)" hint={`It is currently ${currentMonthName}. TPT recommends planning 2-3 months in advance.`}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>I am planning resources to sell in:</div>
          <select 
            value={selectedTarget} 
            onChange={(e) => setSelectedTarget(parseInt(e.target.value))}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px', fontWeight: 600, outline: 'none', color: '#1e293b', background: 'white' }}
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>
                {m} {i === defaultTarget ? '(Suggested)' : ''}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
          {trends.map((t, idx) => (
            <div key={idx} style={{ background: '#fff5f5', border: '1px solid #fecdd3', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#be123c', marginBottom: '6px' }}>{t.title}</div>
              <div style={{ fontSize: '13px', color: '#881337', lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="2. Evergreen High-Demand Niches" hint="Combine these worksheet formats with the seasonal trends above for best results!">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {HIGH_DEMAND_NICHES.map((niche, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '16px', padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '24px' }}>{niche.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#1e293b', marginBottom: '4px' }}>{niche.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px', lineHeight: 1.5 }}><strong>Why it sells:</strong> {niche.why}</div>
                <div style={{ fontSize: '13px', color: '#0369a1', background: '#e0f2fe', padding: '6px 10px', borderRadius: '6px', display: 'inline-block' }}>
                  <strong>How to make it here:</strong> {niche.action}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      
      <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '16px 20px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#1d4ed8' }}>Action Plan Example</div>
          <div style={{ fontSize: '13px', color: '#1e40af', marginTop: '4px' }}>
            If you are targeting <strong>{targetMonthName}</strong>, try creating a <strong>{trends[0].title} {HIGH_DEMAND_NICHES[0].title.split('(')[0].trim()}</strong> worksheet packet!
          </div>
        </div>
        <button 
          onClick={() => {
            const tabs = document.querySelectorAll('button');
            tabs.forEach(t => { if (t.textContent.includes('Worksheet')) t.click(); });
          }}
          style={{ padding: '10px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          Start Creating ➔
        </button>
      </div>

    </div>
  );
}
