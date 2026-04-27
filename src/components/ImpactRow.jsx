import { fmtK } from '../utils.js'

export default function ImpactRow({ totals, baseTotals }) {
  const items = [
    { lbl:'Total Cost',  cur:totals.tot, base:baseTotals.tot, col:'#0C4A8A' },
    { lbl:'Reg Cost',    cur:totals.rc,  base:baseTotals.rc,  col:'#1D6FBF' },
    { lbl:'OT Cost',     cur:totals.oc,  base:baseTotals.oc,  col:'#B45309' },
    { lbl:'Cancel Cost', cur:totals.kc,  base:0,              col:'#EF4444' },
  ]
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:10, marginTop:12 }}>
      {items.map(it => {
        const d = it.cur - it.base
        const col = d > 0 ? '#EF4444' : d < 0 ? '#22C55E' : '#94A3B8'
        const sign = d > 0 ? '+' : d < 0 ? '-' : ''
        return (
          <div key={it.lbl} style={{ background:'#fff', border:'1px solid #DBEAFE', borderRadius:9, padding:'12px 14px', textAlign:'center' }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:700, color:it.col, lineHeight:1 }}>{fmtK(it.cur)}</div>
            <div style={{ fontSize:12, color:'#94A3B8', marginTop:3 }}>{it.lbl}</div>
            <div style={{ fontSize:11, fontWeight:600, color:col, marginTop:3 }}>
              {d !== 0 ? `${sign}${fmtK(Math.abs(d))} vs default` : 'at default'}
            </div>
          </div>
        )
      })}
    </div>
  )
}
