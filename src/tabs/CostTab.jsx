// CostTab.jsx — Cost breakdown bars + stacked monthly bar chart
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { fmt, fmtK } from '../utils.js'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'rgba(255,255,255,.97)', border:'1px solid #DBEAFE', borderRadius:8, padding:'8px 12px', fontSize:11 }}>
      <p style={{ fontWeight:700, color:'#0C4A8A', marginBottom:5 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:5, marginBottom:2 }}>
          <div style={{ width:7, height:7, borderRadius:2, background:p.color }}/>
          <span style={{ color:'#475569' }}>{p.name}:</span>
          <span style={{ fontWeight:600 }}>{typeof p.value === 'number' ? fmt(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function CostTab({ data, totals }) {
  const categories = [
    { lbl:'Regular Crew', val:totals.rc,  col:'#1D6FBF' },
    { lbl:'Overtime',     val:totals.oc,  col:'#F59E0B' },
    { lbl:'Reserve',      val:totals.rsc, col:'#10B981' },
    { lbl:'Cancellations',val:totals.kc,  col:'#EF4444' },
  ]
  const card = { background:'#fff', border:'1px solid #DBEAFE', borderRadius:10, margin:'0 10px 8px', padding:12 }
  return (
    <>
      <div style={card}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, color:'#0C4A8A', marginBottom:10 }}>Annual Cost Breakdown</div>
        {categories.map(c => {
          const p = totals.tot > 0 ? (c.val / totals.tot * 100).toFixed(1) : 0
          return (
            <div key={c.lbl} style={{ marginBottom:9 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                <span style={{ fontSize:11, color:'#475569', fontWeight:500 }}>{c.lbl}</span>
                <span style={{ fontSize:11, fontWeight:700, color:c.col }}>{p}% <span style={{ fontSize:10, color:'#94A3B8' }}>{fmt(c.val)}</span></span>
              </div>
              <div style={{ height:7, background:'#F1F5F9', borderRadius:3, overflow:'hidden' }}>
                <div style={{ width:`${p}%`, height:'100%', background:c.col, borderRadius:3, transition:'width .5s ease' }}/>
              </div>
            </div>
          )
        })}
        <div style={{ borderTop:'1px solid #F1F5F9', paddingTop:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:11, fontWeight:600, color:'#475569' }}>Total</span>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:700, color:'#0C4A8A' }}>{fmt(totals.tot)}</span>
        </div>
      </div>
      <div style={card}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, color:'#0C4A8A', marginBottom:8 }}>Monthly Cost by Component</div>
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
            <XAxis dataKey="m" tick={{ fontSize:9 }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fontSize:9 }} axisLine={false} tickLine={false} width={45} tickFormatter={v => '$' + Math.round(v/1000) + 'K'}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend wrapperStyle={{ fontSize:10 }}/>
            <Bar dataKey="rc"  name="Regular"  stackId="a" fill="#1D6FBF"/>
            <Bar dataKey="oc"  name="Overtime" stackId="a" fill="#F59E0B"/>
            <Bar dataKey="rsc" name="Reserve"  stackId="a" fill="#10B981"/>
            <Bar dataKey="kc"  name="Cancel"   stackId="a" fill="#EF4444" radius={[2,2,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
