import { fmtM, fmtK } from '../utils.js'

export default function KPIRow({ data, totals }) {
  const peak = data.reduce((p, r) => r.tot > p.tot ? r : p, data[0])
  const items = [
    { icon:'💰', val:fmtM(totals.tot),                                 lbl:'Annual Total Cost',   sub:'Optimized minimum',    col:'#0C4A8A' },
    { icon:'👨‍✈️', val:data.reduce((s,r)=>s+r.c,0).toLocaleString(),  lbl:'Regular Crew-Pairs',  sub:'Annual scheduled',     col:'#1D6FBF' },
    { icon:'⏰', val:data.reduce((s,r)=>s+r.o,0).toLocaleString(),    lbl:'OT Crew-Pairs',        sub:'Summer peak only',     col:'#B45309' },
    { icon:'🛡️', val:data.reduce((s,r)=>s+r.r,0).toLocaleString(),   lbl:'Reserve Pool',         sub:'FAA mandated',         col:'#065F46' },
    { icon:'✈️', val:totals.k===0?'0':totals.k.toLocaleString(),      lbl:'Cancellations',        sub:totals.k===0?'Zero — optimal':'⚠ Cancelled', col:totals.k===0?'#15803D':'#EF4444' },
    { icon:'📈', val:fmtK(peak.tot),                                   lbl:`Peak: ${peak.m}`,      sub:'Highest month cost',   col:'#991B1B' },
  ]
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
      {items.map(k => (
        <div key={k.lbl} style={{ background:'#fff', border:'1px solid #DBEAFE', borderRadius:11, padding:'18px 20px' }}>
          <div style={{ fontSize:26, marginBottom:8 }}>{k.icon}</div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:28, fontWeight:700, color:k.col, lineHeight:1 }}>{k.val}</div>
          <div style={{ fontSize:15, fontWeight:600, color:'#475569', marginTop:6 }}>{k.lbl}</div>
          <div style={{ fontSize:13, color:'#94A3B8', marginTop:3 }}>{k.sub}</div>
        </div>
      ))}
    </div>
  )
}
