// Header.jsx — Gradient hero with animated planes
export default function Header() {
  return (
    <div style={{ background:'linear-gradient(135deg,#0C4A8A,#1D6FBF 55%,#2880D0)', padding:'12px 14px 10px', position:'relative', overflow:'hidden' }}>
      <div className="plane-1" style={{ position:'absolute', top:10 }}>
        <svg width="68" height="26" viewBox="0 0 68 26" fill="none">
          <path d="M2 14 L49 9 L61 13 L49 17 Z" fill="white"/>
          <path d="M49 9 L63 11 L61 13 L49 13 Z" fill="rgba(255,255,255,0.5)"/>
          <path d="M20 9 L30 2 L32 9 Z" fill="rgba(255,255,255,0.7)"/>
          <path d="M22 17 L30 23 L32 17 Z" fill="rgba(255,255,255,0.7)"/>
          <line x1="0" y1="13" x2="-18" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 2"/>
        </svg>
      </div>
      <div className="plane-2" style={{ position:'absolute', top:34 }}>
        <svg width="44" height="17" viewBox="0 0 44 17" fill="none">
          <path d="M2 9 L31 6 L39 8.5 L31 11 Z" fill="rgba(255,255,255,0.55)"/>
          <path d="M13 6 L20 1 L21 6 Z" fill="rgba(255,255,255,0.45)"/>
          <path d="M14 11 L20 15 L21 11 Z" fill="rgba(255,255,255,0.45)"/>
        </svg>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:10, position:'relative', zIndex:1 }}>
        <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:7, padding:'5px 8px', flexShrink:0 }}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path d="M1 9 L15 6 L19 8 L15 11 Z" fill="white"/>
            <path d="M15 6 L20 7 L19 8 L15 8 Z" fill="rgba(255,255,255,0.6)"/>
            <path d="M6 6 L11 1 L12 6 Z" fill="rgba(255,255,255,0.7)"/>
            <path d="M7 10 L11 14 L12 10 Z" fill="rgba(255,255,255,0.7)"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize:9, color:'rgba(255,255,255,0.5)', letterSpacing:'0.07em', textTransform:'uppercase', fontWeight:500 }}>Airline Scheduling</div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:'#fff', lineHeight:1.2 }}>Crew Scheduling LP Dashboard</div>
          <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', marginTop:1 }}>Crew Allocation Optimizer · FY 2024 · 12-Month Planning Horizon</div>
        </div>
      </div>
      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginTop:8, position:'relative', zIndex:1 }}>
        {['LP Optimizer','R²=0.5509','324 months data','5 constraints','48 variables'].map(p=>(
          <span key={p} style={{ background:'rgba(255,255,255,0.13)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:6, padding:'2px 8px', fontSize:9, color:'rgba(255,255,255,0.85)', fontWeight:500 }}>{p}</span>
        ))}
      </div>
    </div>
  )
}
