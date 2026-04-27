import { FIELDS_A, FIELDS_B } from '../data.js'
import { sliderPct } from '../utils.js'

function SliderField({ f, val, onChange }) {
  const pct = sliderPct(val, f.min, f.max)
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
        <span style={{ fontSize:15, fontWeight:500, color:'#334155' }}>{f.lbl}</span>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ fontSize:14, color:'#94A3B8' }}>{f.pre}</span>
          <input type="number" min={f.min} max={f.max} step={f.step} value={val}
            onChange={e => onChange(f.k, parseFloat(e.target.value)||0)}
            style={{ width:90, border:'1.5px solid #BFDBFE', borderRadius:7, padding:'5px 10px', fontSize:15, fontWeight:700, color:'#0C4A8A', textAlign:'right', outline:'none', background:'#fff', fontFamily:"'Space Grotesk',sans-serif" }}/>
          <span style={{ fontSize:13, color:'#94A3B8' }}>{f.suf}</span>
        </div>
      </div>
      <input type="range" min={f.min} max={f.max} step={f.step} value={val}
        style={{ width:'100%', height:6, appearance:'none', background:`linear-gradient(to right,#1D6FBF ${pct}%,#DBEAFE ${pct}%)`, borderRadius:3, outline:'none', cursor:'pointer' }}
        onChange={e => onChange(f.k, parseFloat(e.target.value))}/>
      <div style={{ fontSize:13, color:'#94A3B8', marginTop:4 }}>{f.hint}</div>
    </div>
  )
}

export default function AssumptionInputs({ assumptions, onChange, onReset }) {
  const box = { background:'#fff', border:'1px solid #DBEAFE', borderRadius:11, padding:'18px 20px', marginBottom:16 }
  return (
    <>
      <div style={box}>
        <div style={{ fontSize:15, fontWeight:700, color:'#0C4A8A', marginBottom:16 }}>Section A — Labor Costs</div>
        {FIELDS_A.map(f => <SliderField key={f.k} f={f} val={assumptions[f.k]} onChange={onChange}/>)}
      </div>
      
      <div style={box}>
        <div style={{ fontSize:15, fontWeight:700, color:'#0C4A8A', marginBottom:16 }}>Section B — Capacity Limits</div>
        {FIELDS_B.map(f => <SliderField key={f.k} f={f} val={assumptions[f.k]} onChange={onChange}/>)}
      </div>

      <button onClick={onReset} style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:8, padding:'8px 18px', fontSize:14, fontWeight:600, color:'#1D6FBF', cursor:'pointer', transition:'all .15s' }}>
        ↺ Reset to defaults
      </button>
    </>
  )
}
