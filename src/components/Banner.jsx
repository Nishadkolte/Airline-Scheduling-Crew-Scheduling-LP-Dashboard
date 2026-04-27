export default function Banner({ violations }) {
  const ok = violations.length === 0
  return (
    <div style={{ borderRadius:10, padding:'14px 18px', display:'flex', alignItems:'flex-start', gap:14, background:ok?'#F0FDF4':'#FEF2F2', border:`1px solid ${ok?'#86EFAC':'#FECACA'}`, marginBottom:16 }}>
      <div style={{ width:30, height:30, borderRadius:7, background:ok?'#22C55E':'#EF4444', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, animation:ok?'none':'pulse 1.2s ease infinite' }}>
        {ok
          ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5l5 5 7-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 5v5M7.5 11.5v.4" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
        }
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:600, fontSize:15, color:ok?'#166534':'#991B1B' }}>
          {ok ? 'All 5 Constraints Satisfied — Model Feasible · Zero Cancellations'
               : `${violations.length} Constraint Violation${violations.length>1?'s':''} — Check "Constraint Checker" tab`}
        </div>
        <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginTop:6 }}>
          {ok
            ? ['C1','C2','C3','C4','C5'].map(c => <span key={c} style={{ fontSize:13, fontWeight:700, padding:'3px 10px', borderRadius:11, background:'#DCFCE7', color:'#166534', border:'1px solid #BBF7D0' }}>{c} ✓</span>)
            : violations.map((v,i) => <span key={i} style={{ fontSize:13, fontWeight:700, padding:'3px 10px', borderRadius:11, background:'#FEE2E2', color:'#991B1B', border:'1px solid #FECACA' }}>{v.c}: {v.msg}</span>)
          }
        </div>
      </div>
    </div>
  )
}
