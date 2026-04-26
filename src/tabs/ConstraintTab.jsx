// ConstraintTab.jsx — Full 5-constraint checker with per-month grids
import { buildConstraintFns } from '../utils.js'
import { isPeak } from '../utils.js'

function MonthGrid({ data, fn }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:3 }}>
      {data.map((r, i) => {
        const { ok, lhs, rhs } = fn(r)
        const bg  = ok ? '#F0FDF4' : isPeak(r.m) ? '#FFFBEB' : '#FEF2F2'
        const bdr = ok ? '#BBF7D0' : isPeak(r.m) ? '#FDE68A' : '#FECACA'
        const col = ok ? '#166534' : '#991B1B'
        return (
          <div key={i} style={{ background:bg, border:`1px solid ${bdr}`, borderRadius:5, padding:'4px 3px', textAlign:'center' }}>
            <div style={{ fontSize:9, fontWeight:700, color:col }}>{r.m}</div>
            <div style={{ fontSize:10, fontWeight:600, margin:'1px 0' }}>{lhs}</div>
            <div style={{ fontSize:8, color:'#94A3B8' }}>{ok ? '✓' : '✗'} {rhs}</div>
          </div>
        )
      })}
    </div>
  )
}

export default function ConstraintTab({ data, assumptions }) {
  const fns = buildConstraintFns(assumptions)
  const allOk = fn => data.every(r => fn(r).ok)
  const tag = ok => (
    <span style={{ fontSize:9, fontWeight:700, padding:'1px 7px', borderRadius:8, flexShrink:0, marginLeft:6, background:ok?'#DCFCE7':'#FEE2E2', color:ok?'#166534':'#991B1B', border:`1px solid ${ok?'#BBF7D0':'#FECACA'}` }}>
      {ok ? '✓ All clear' : '✗ Violated'}
    </span>
  )

  const constraints = [
    { id:'C1', title:'C1 — Demand Coverage: Cₜ+Oₜ+Kₜ = Fₜ', full:true, fn:fns.C1 },
    { id:'C2', title:`C2 — FAA Part 117: Cₜ ≤ ${assumptions.regCap.toLocaleString()}`, fn:fns.C2 },
    { id:'C3', title:`C3 — CBA OT Cap: Oₜ ≤ ${assumptions.otCap}`, fn:fns.C3 },
    { id:'C4', title:`C4 — FAA Min Reserve: Rₜ ≥ ${assumptions.minR}%×Fₜ`, fn:fns.C4 },
    { id:'C5', title:`C5 — Reserve Pool Cap: Rₜ ≤ ${assumptions.resCap}`, fn:fns.C5 },
  ]

  return (
    <div style={{ padding:'0 10px 8px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
        {constraints.map(con => (
          <div key={con.id} style={{ background:'#fff', border:'1px solid #DBEAFE', borderRadius:10, padding:'10px 11px', gridColumn:con.full?'1/-1':'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}>
              <span style={{ fontSize:10, fontWeight:700, color:'#0C4A8A' }}>{con.title}</span>
              {tag(allOk(con.fn))}
            </div>
            <MonthGrid data={data} fn={con.fn}/>
          </div>
        ))}
      </div>
    </div>
  )
}
