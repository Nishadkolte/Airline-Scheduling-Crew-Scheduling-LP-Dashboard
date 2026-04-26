// ─────────────────────────────────────────────────────────────────────────────
// App.jsx  —  Root component — layout & state management
// Flow: Assumptions → Impact → Banner → KPIs → Detailed Tabs
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useCallback, useMemo } from 'react'
import { BASE_DATA, DEFAULTS } from './data.js'
import { computeData, sumTotals, checkViolations } from './utils.js'
import Header            from './components/Header.jsx'
import AssumptionInputs  from './components/AssumptionInputs.jsx'
import ImpactRow         from './components/ImpactRow.jsx'
import Banner            from './components/Banner.jsx'
import KPIRow            from './components/KPIRow.jsx'
import ScheduleTab       from './tabs/ScheduleTab.jsx'
import ConstraintTab     from './tabs/ConstraintTab.jsx'
import CostTab           from './tabs/CostTab.jsx'
import SeasonTab         from './tabs/SeasonTab.jsx'
import ForecastTab       from './tabs/ForecastTab.jsx'

// Pre-compute default totals for delta comparison in ImpactRow
const DEFAULT_DATA   = computeData(BASE_DATA, DEFAULTS)
const DEFAULT_TOTALS = sumTotals(DEFAULT_DATA)

const TABS = [
  { id: 'schedule',    label: 'Monthly Schedule' },
  { id: 'constraints', label: 'Constraint Checker' },
  { id: 'cost',        label: 'Cost Breakdown' },
  { id: 'season',      label: 'Season Costs' },
  { id: 'forecast',    label: 'Delay Forecast' },
]

const SectionLabel = ({ num, children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:7, padding:'10px 12px 5px', fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, color:'#0C4A8A', textTransform:'uppercase', letterSpacing:'0.05em' }}>
    <div style={{ width:20, height:20, background:'#0C4A8A', color:'#fff', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, flexShrink:0 }}>{num}</div>
    {children}
  </div>
)

export default function App() {
  const [assumptions, setAssumptions] = useState({ ...DEFAULTS })
  const [activeTab, setActiveTab]     = useState('schedule')

  // Update a single assumption field
  const handleChange = useCallback((key, value) => {
    setAssumptions(prev => ({ ...prev, [key]: value }))
  }, [])

  // Reset all assumptions to defaults
  const handleReset = useCallback(() => {
    setAssumptions({ ...DEFAULTS })
  }, [])

  // Derived data (re-computed when assumptions change)
  const data       = useMemo(() => computeData(BASE_DATA, assumptions), [assumptions])
  const totals     = useMemo(() => sumTotals(data), [data])
  const violations = useMemo(() => checkViolations(data, assumptions), [data, assumptions])

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:'#F0F7FF', minHeight:'100vh', color:'#1e293b' }}>

      {/* ── HEADER ── */}
      <Header/>

      {/* ── ① ASSUMPTIONS ── */}
      <SectionLabel num="1">Assumptions — Edit inputs to recalculate everything below</SectionLabel>
      <AssumptionInputs assumptions={assumptions} onChange={handleChange} onReset={handleReset}/>

      {/* Live cost impact vs defaults */}
      <ImpactRow totals={totals} baseTotals={DEFAULT_TOTALS}/>

      {/* ── CONSTRAINT STATUS BANNER ── */}
      <Banner violations={violations}/>

      {/* ── ② KPIs ── */}
      <SectionLabel num="2">Key Performance Indicators</SectionLabel>
      <KPIRow data={data} totals={totals}/>

      {/* ── ③ DETAILED ANALYSIS TABS ── */}
      <SectionLabel num="3">Detailed Analysis</SectionLabel>
      <div style={{ display:'flex', gap:3, padding:'0 10px 7px', overflowX:'auto', scrollbarWidth:'none' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding:'5px 11px', borderRadius:6, fontSize:11, fontWeight:600, cursor:'pointer', border:'none', background:activeTab===t.id?'#0C4A8A':'transparent', color:activeTab===t.id?'#fff':'#64748B', whiteSpace:'nowrap', transition:'all .15s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'schedule'    && <ScheduleTab    data={data} totals={totals} assumptions={assumptions}/>}
      {activeTab === 'constraints' && <ConstraintTab  data={data} assumptions={assumptions}/>}
      {activeTab === 'cost'        && <CostTab        data={data} totals={totals}/>}
      {activeTab === 'season'      && <SeasonTab      assumptions={assumptions}/>}
      {activeTab === 'forecast'    && <ForecastTab/>}

      {/* ── FOOTER ── */}
      <div style={{ borderTop:'1px solid #DBEAFE', padding:'8px 12px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:10, color:'#94A3B8', background:'#fff', flexWrap:'wrap', gap:4 }}>
        <span>Airline Crew Scheduling LP Dashboard · FY 2024</span>
        <span>
          Status: <strong style={{ color:totals.k===0?'#22C55E':'#EF4444' }}>{totals.k===0?'Feasible · Zero Cancellations':'⚠ Cancellations Detected'}</strong>
          {' '}· Total: <strong style={{ color:'#0C4A8A' }}>${Math.round(totals.tot).toLocaleString()}</strong>
        </span>
      </div>
    </div>
  )
}
