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

const DEFAULT_DATA   = computeData(BASE_DATA, DEFAULTS)
const DEFAULT_TOTALS = sumTotals(DEFAULT_DATA)

const TABS = [
  { id: 'schedule',    label: 'Monthly Schedule'   },
  { id: 'constraints', label: 'Constraint Checker' },
  { id: 'cost',        label: 'Cost Breakdown'     },
  { id: 'season',      label: 'Season Costs'       },
  { id: 'forecast',    label: 'Delay Forecast'     },
]

const SectionLabel = ({ num, children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:10, padding:'16px 0 10px', fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:700, color:'#0C4A8A', textTransform:'uppercase', letterSpacing:'0.06em' }}>
    <div style={{ width:26, height:26, background:'#0C4A8A', color:'#fff', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, flexShrink:0 }}>{num}</div>
    {children}
  </div>
)

export default function App() {
  const [assumptions, setAssumptions] = useState({ ...DEFAULTS })
  const [activeTab, setActiveTab]     = useState('schedule')

  const handleChange = useCallback((key, value) => setAssumptions(prev => ({ ...prev, [key]: value })), [])
  const handleReset  = useCallback(() => setAssumptions({ ...DEFAULTS }), [])

  const data       = useMemo(() => computeData(BASE_DATA, assumptions), [assumptions])
  const totals     = useMemo(() => sumTotals(data), [data])
  const violations = useMemo(() => checkViolations(data, assumptions), [data, assumptions])

  const tabStyle = active => ({
    padding: '9px 20px', borderRadius: 8, fontSize: 15, fontWeight: 600,
    cursor: 'pointer', border: 'none', whiteSpace: 'nowrap', transition: 'all .15s',
    background: active ? '#0C4A8A' : 'transparent',
    color: active ? '#fff' : '#64748B',
  })

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:'#F0F7FF', minHeight:'100vh', color:'#1e293b' }}>

      <Header/>

      <div className="page-wrap">

        {/* TWO-COLUMN LAYOUT: Assumptions (left) + Results (right) */}
        <div className="two-col-layout" style={{ display:'grid', gridTemplateColumns:'500px 1fr', gap:20, marginBottom:20 }}>
          
          {/* LEFT: Assumptions */}
          <div>
            <SectionLabel num="1">Assumptions</SectionLabel>
            <AssumptionInputs assumptions={assumptions} onChange={handleChange} onReset={handleReset}/>
          </div>

          {/* RIGHT: Impact + Banner + KPIs */}
          <div>
            <SectionLabel num="2">Live Results</SectionLabel>
            <ImpactRow totals={totals} baseTotals={DEFAULT_TOTALS}/>
            <Banner violations={violations}/>
            <KPIRow data={data} totals={totals}/>
          </div>
        </div>

        {/* FULL WIDTH: Detailed Analysis */}
        <SectionLabel num="3">Detailed Analysis</SectionLabel>
        <div style={{ display:'flex', gap:6, marginBottom:14, overflowX:'auto', scrollbarWidth:'none' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={tabStyle(activeTab === t.id)}>{t.label}</button>
          ))}
        </div>

        {activeTab === 'schedule'    && <ScheduleTab    data={data} totals={totals} assumptions={assumptions}/>}
        {activeTab === 'constraints' && <ConstraintTab  data={data} assumptions={assumptions}/>}
        {activeTab === 'cost'        && <CostTab        data={data} totals={totals}/>}
        {activeTab === 'season'      && <SeasonTab      assumptions={assumptions}/>}
        {activeTab === 'forecast'    && <ForecastTab/>}

        <div style={{ borderTop:'1px solid #DBEAFE', padding:'12px 0', display:'flex', justifyContent:'space-between', fontSize:14, color:'#94A3B8', background:'transparent', flexWrap:'wrap', gap:6, marginTop:12 }}>
          <span>Airline Crew Scheduling LP Dashboard · FY 2024</span>
          <span>
            Status: <strong style={{ color:totals.k===0?'#22C55E':'#EF4444' }}>{totals.k===0?'Feasible · Zero Cancellations':'⚠ Cancellations'}</strong>
            {' '}· Total: <strong style={{ color:'#0C4A8A' }}>${Math.round(totals.tot).toLocaleString()}</strong>
          </span>
        </div>

      </div>
    </div>
  )
}
