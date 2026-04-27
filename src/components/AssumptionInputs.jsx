import { FIELDS_A, FIELDS_B } from '../data.js'
import { sliderPct } from '../utils.js'

function SliderField({ f, val, onChange }) {
  const pct = sliderPct(val, f.min, f.max)
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
        <span style={{ fontSize:13, fontWeight:500, color:'#334155' }}>{f.lbl}</span>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          <span style={{ fontSize:12, color:'#94A3B8' }}>{f.pre}</span>
          <input type="number" min={f.min} max={f.max} step={f.step} value={val}
            onChange={e => onChange(f.k, parseFloat(e.target.value)||0)}
            style={{ width:78, border:'1.5px solid #BFDBFE', borderRadius:6, padding:'3px 8px', fontSize:13, fontWeight:700, color:'#0C4A8A', textAlign:'right', outline:'none', background:'#fff', fontFamily:"'Space Grotesk',sans-serif" }}/>
          <span style={{ fontSize:11, color:'#94A3B8' }}>{f.suf}</span>
        </div>
      </div>
      <input type="range" min={f.min} max={f.max} step={f.step} value={val}
        style={{ width:'100%', height:5, appearance:'none', background:`linear-gradient(to right,#1D6FBF ${pct}%,#DBEAFE ${pct}%)`, borderRadius:3, outline:'none', cursor:'pointer' }}
        onChange={e => onChange(f.k, parseFloat(e.target.value))}/>
      <div style={{ fontSize:11, color:'#94A3B8', marginTop:3 }}>{f.hint}</div>
    </div>
  )
}

export default function AssumptionInputs({ assumptions, onChange, onReset }) {
  const box = { background:'#fff', border:'1px solid #DBEAFE', borderRadius:10, padding:'14px 16px', marginBottom:12 }
  return (
    <>
      {/* Section A */}
      <div style={box}>
        <div style={{ fontSize:13, fontWeight:700, color:'#0C4A8A', marginBottom:12 }}>Section A — Labor Costs</div>
        {FIELDS_A.map(f => <SliderField key={f.k} f={f} val={assumptions[f.k]} onChange={onChange}/>)}
      </div>
      
      {/* Section B */}
      <div style={box}>
        <div style={{ fontSize:13, fontWeight:700, color:'#0C4A8A', marginBottom:12 }}>Section B — Capacity Limits</div>
        {FIELDS_B.map(f => <SliderField key={f.k} f={f} val={assumptions[f.k]} onChange={onChange}/>)}
      </div>

      <button onClick={onReset} style={{ display:'inline-flex', alignItems:'center', gap:5, background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:7, padding:'6px 14px', fontSize:12, fontWeight:600, color:'#1D6FBF', cursor:'pointer', transition:'all .15s' }}>
        ↺ Reset to defaults
      </button>
    </>
  )
}
