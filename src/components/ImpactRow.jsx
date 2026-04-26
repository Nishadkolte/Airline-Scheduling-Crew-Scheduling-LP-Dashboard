// ImpactRow.jsx — Live cost delta vs defaults
import { fmtK } from '../utils.js'

export default function ImpactRow({ totals, baseTotals }) {
  const items = [
    { lbl:'Total Cost',  cur:totals.tot, base:baseTotals.tot, col:'#0C4A8A' },
    { lbl:'Reg Cost',    cur:totals.rc,  base:baseTotals.rc,  col:'#1D6FBF' },
    { lbl:'OT Cost',     cur:totals.oc,  base:baseTotals.oc,  col:'#B45309' },
    { lbl:'Cancel Cost', cur:totals.kc,  base:0,              col:'#EF4444' },
  ]
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))', gap:6, padding:'0 10px 8px' }}>
      {items.map(it => {
        const d = it.cur - it.base
        const col = d > 0 ? '#EF4444' : d < 0 ? '#22C55E' : '#94A3B8'
        const sign = d > 0 ? '+' : d < 0 ? '-' : ''
        return (
          <div key={it.lbl} style={{ background:'#fff', border:'1px solid #DBEAFE', borderRadius:8, padding:'8px 10px', textAlign:'center' }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:700, color:it.col, lineHeight:1 }}>{fmtK(it.cur)}</div>
            <div style={{ fontSize:9, color:'#94A3B8', marginTop:2 }}>{it.lbl}</div>
            <div style={{ fontSize:9, fontWeight:600, color:col, marginTop:2 }}>
              {d !== 0 ? `${sign}${fmtK(Math.abs(d))} vs default` : 'at default'}
            </div>
          </div>
        )
      })}
    </div>
  )
}
