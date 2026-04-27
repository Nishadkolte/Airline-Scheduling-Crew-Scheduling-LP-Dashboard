import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { fmt } from '../utils.js'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'rgba(255,255,255,.97)', border:'1px solid #DBEAFE', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
      <p style={{ fontWeight:700, color:'#0C4A8A', marginBottom:6 }}>{label}</p>
      {payload.map((p,i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2 }}>
          <div style={{ width:8, height:8, borderRadius:2, background:p.color }}/>
          <span style={{ color:'#475569' }}>{p.name}:</span>
          <span style={{ fontWeight:600 }}>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function CostTab({ data, totals }) {
  const cats = [
    { lbl:'Regular Crew', val:totals.rc,  col:'#1D6FBF' },
    { lbl:'Overtime',     val:totals.oc,  col:'#F59E0B' },
    { lbl:'Reserve',      val:totals.rsc, col:'#10B981' },
    { lbl:'Cancellations',val:totals.kc,  col:'#EF4444' },
  ]
  const card = { background:'#fff', border:'1px solid #DBEAFE', borderRadius:10, padding:'16px 18px', marginBottom:12 }
  return (
    <>
      <div style={card}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:'#0C4A8A', marginBottom:12 }}>Annual Cost Breakdown</div>
        {cats.map(c => {
          const p = totals.tot > 0 ? (c.val / totals.tot * 100).toFixed(1) : 0
          return (
            <div key={c.lbl} style={{ marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ fontSize:13, color:'#475569', fontWeight:500 }}>{c.lbl}</span>
                <span style={{ fontSize:13, fontWeight:700, color:c.col }}>{p}% <span style={{ fontSize:12, color:'#94A3B8' }}>{fmt(c.val)}</span></span>
              </div>
              <div style={{ height:9, background:'#F1F5F9', borderRadius:4, overflow:'hidden' }}>
                <div style={{ width:`${p}%`, height:'100%', background:c.col, borderRadius:4, transition:'width .5s ease' }}/>
              </div>
            </div>
          )
        })}
        <div style={{ borderTop:'1px solid #F1F5F9', paddingTop:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:13, fontWeight:600, color:'#475569' }}>Total</span>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:700, color:'#0C4A8A' }}>{fmt(totals.tot)}</span>
        </div>
      </div>
      <div style={card}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:'#0C4A8A', marginBottom:10 }}>Monthly Cost by Component</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
            <XAxis dataKey="m" tick={{ fontSize:12 }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fontSize:12 }} axisLine={false} tickLine={false} width={50} tickFormatter={v=>'$'+Math.round(v/1000)+'K'}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend wrapperStyle={{ fontSize:12 }}/>
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
