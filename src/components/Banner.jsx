export default function Banner({ violations }) {
  const ok = violations.length === 0
  return (
    <div style={{ borderRadius:9, padding:'11px 14px', display:'flex', alignItems:'flex-start', gap:11, background:ok?'#F0FDF4':'#FEF2F2', border:`1px solid ${ok?'#86EFAC':'#FECACA'}`, marginTop:10 }}>
      <div style={{ width:26, height:26, borderRadius:6, background:ok?'#22C55E':'#EF4444', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, animation:ok?'none':'pulse 1.2s ease infinite' }}>
        {ok
          ? <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l4 4 6-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 4v4.5M6.5 10v.4" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg>
        }
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:600, fontSize:13, color:ok?'#166534':'#991B1B' }}>
          {ok ? 'All 5 Constraints Satisfied — Model Feasible · Zero Cancellations'
               : `${violations.length} Constraint Violation${violations.length>1?'s':''} — Check "Constraint Checker" tab below`}
        </div>
        <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginTop:5 }}>
          {ok
            ? ['C1','C2','C3','C4','C5'].map(c => <span key={c} style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:10, background:'#DCFCE7', color:'#166534', border:'1px solid #BBF7D0' }}>{c} ✓</span>)
            : violations.map((v,i) => <span key={i} style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:10, background:'#FEE2E2', color:'#991B1B', border:'1px solid #FECACA' }}>{v.c}: {v.msg}</span>)
          }
        </div>
      </div>
    </div>
  )
}
