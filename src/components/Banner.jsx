// Banner.jsx — Compact pass/fail constraint status banner
export default function Banner({ violations }) {
  const ok = violations.length === 0
  return (
    <div style={{
      margin:'0 10px 8px', borderRadius:8, padding:'8px 11px',
      display:'flex', alignItems:'flex-start', gap:9,
      background: ok ? '#F0FDF4' : '#FEF2F2',
      border: `1px solid ${ok ? '#BBF7D0' : '#FECACA'}`,
    }}>
      <div style={{
        width:24, height:24, borderRadius:5, flexShrink:0, marginTop:1,
        background: ok ? '#22C55E' : '#EF4444',
        display:'flex', alignItems:'center', justifyContent:'center',
        animation: ok ? 'none' : 'pulse 1.2s ease infinite',
      }}>
        {ok
          ? <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l3 3 4-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 3.5v3M5.5 8v.3" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M4.7 1.2L.5 9h10L6.3 1.2z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/></svg>
        }
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:600, fontSize:11, color: ok ? '#166534' : '#991B1B' }}>
          {ok
            ? 'All 5 Constraints Satisfied — Model Feasible · Zero Cancellations'
            : `${violations.length} Constraint Violation${violations.length > 1 ? 's' : ''} Detected — Check "Constraint Checker" tab below`
          }
        </div>
        <div style={{ display:'flex', gap:3, flexWrap:'wrap', marginTop:4 }}>
          {ok
            ? ['C1','C2','C3','C4','C5'].map(c => (
                <span key={c} style={{ fontSize:9, fontWeight:700, padding:'1px 6px', borderRadius:8, background:'#DCFCE7', color:'#166534', border:'1px solid #BBF7D0' }}>{c} ✓</span>
              ))
            : violations.map((v, i) => (
                <span key={i} style={{ fontSize:9, fontWeight:700, padding:'1px 6px', borderRadius:8, background:'#FEE2E2', color:'#991B1B', border:'1px solid #FECACA' }}>{v.c}: {v.msg}</span>
              ))
          }
        </div>
      </div>
    </div>
  )
}
