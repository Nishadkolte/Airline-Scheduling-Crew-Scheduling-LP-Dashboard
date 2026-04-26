// KPIRow.jsx — 6 key performance indicator cards
import { fmtM, fmtK } from '../utils.js'

export default function KPIRow({ data, totals }) {
  const peak = data.reduce((p, r) => r.tot > p.tot ? r : p, data[0])
  const items = [
    { icon:'💰', val:fmtM(totals.tot),                               lbl:'Annual Total Cost',  sub:'Optimized minimum',    col:'#0C4A8A' },
    { icon:'👨‍✈️', val:data.reduce((s,r)=>s+r.c,0).toLocaleString(), lbl:'Regular Crew-Pairs', sub:'Annual scheduled',    col:'#1D6FBF' },
    { icon:'⏰', val:data.reduce((s,r)=>s+r.o,0).toLocaleString(),   lbl:'OT Crew-Pairs',      sub:'Summer peak only',    col:'#B45309' },
    { icon:'🛡️', val:data.reduce((s,r)=>s+r.r,0).toLocaleString(),  lbl:'Reserve Pool',       sub:'FAA mandated',        col:'#065F46' },
    { icon:'✈️', val:totals.k === 0 ? '0' : totals.k.toLocaleString(), lbl:'Cancellations', sub: totals.k === 0 ? 'Zero — optimal' : '⚠ Flights cancelled', col: totals.k === 0 ? '#15803D' : '#EF4444' },
    { icon:'📈', val:fmtK(peak.tot),                                  lbl:`Peak: ${peak.m}`,   sub:'Highest month cost',  col:'#991B1B' },
  ]
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6, padding:'0 10px 8px' }}>
      {items.map(k => (
        <div key={k.lbl} style={{ background:'#fff', border:'1px solid #DBEAFE', borderRadius:9, padding:'10px 11px' }}>
          <div style={{ fontSize:13, marginBottom:4 }}>{k.icon}</div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:700, color:k.col, lineHeight:1 }}>{k.val}</div>
          <div style={{ fontSize:10, fontWeight:600, color:'#475569', marginTop:2 }}>{k.lbl}</div>
          <div style={{ fontSize:9, color:'#94A3B8', marginTop:1 }}>{k.sub}</div>
        </div>
      ))}
    </div>
  )
}
