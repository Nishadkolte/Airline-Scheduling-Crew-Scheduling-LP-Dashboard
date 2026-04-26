// AssumptionInputs.jsx — Section A & B sliders + number inputs
import { FIELDS_A, FIELDS_B } from '../data.js'
import { sliderPct } from '../utils.js'

function SliderField({ f, val, onChange }) {
  const pct = sliderPct(val, f.min, f.max)
  const s = {
    wrapper: { marginBottom: 10 },
    top:     { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:3 },
    label:   { fontSize:11, fontWeight:500, color:'#475569' },
    valRow:  { display:'flex', alignItems:'center', gap:3 },
    pre:     { fontSize:10, color:'#94A3B8' },
    numInp:  { width:68, border:'1.5px solid #BFDBFE', borderRadius:5, padding:'2px 6px', fontSize:11, fontWeight:700, color:'#0C4A8A', textAlign:'right', outline:'none', background:'#fff', fontFamily:"'Space Grotesk',sans-serif" },
    suf:     { fontSize:9, color:'#94A3B8' },
    range:   { width:'100%', height:4, appearance:'none', background:`linear-gradient(to right,#1D6FBF ${pct}%,#DBEAFE ${pct}%)`, borderRadius:2, outline:'none', cursor:'pointer', marginTop:2 },
    hint:    { fontSize:9, color:'#94A3B8', marginTop:2 },
  }
  return (
    <div style={s.wrapper}>
      <div style={s.top}>
        <span style={s.label}>{f.lbl}</span>
        <div style={s.valRow}>
          <span style={s.pre}>{f.pre}</span>
          <input type="number" min={f.min} max={f.max} step={f.step} value={val} style={s.numInp}
            onChange={e => onChange(f.k, parseFloat(e.target.value) || 0)}/>
          <span style={s.suf}>{f.suf}</span>
        </div>
      </div>
      <input type="range" min={f.min} max={f.max} step={f.step} value={val} style={s.range}
        onChange={e => onChange(f.k, parseFloat(e.target.value))}/>
      <div style={s.hint}>{f.hint}</div>
    </div>
  )
}

export default function AssumptionInputs({ assumptions, onChange, onReset }) {
  const boxStyle = {
    background:'#fff', border:'1px solid #DBEAFE', borderRadius:10, padding:'11px 12px',
  }
  return (
    <>
      <div style={{ padding:'0 10px 6px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:8 }}>
        <div style={boxStyle}>
          <div style={{ fontSize:11, fontWeight:700, color:'#0C4A8A', marginBottom:8 }}>Section A — Labor Costs</div>
          {FIELDS_A.map(f => <SliderField key={f.k} f={f} val={assumptions[f.k]} onChange={onChange}/>)}
        </div>
        <div style={boxStyle}>
          <div style={{ fontSize:11, fontWeight:700, color:'#0C4A8A', marginBottom:8 }}>Section B — Capacity Limits</div>
          {FIELDS_B.map(f => <SliderField key={f.k} f={f} val={assumptions[f.k]} onChange={onChange}/>)}
        </div>
      </div>
      <button onClick={onReset} style={{ display:'flex', alignItems:'center', gap:4, background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:6, padding:'4px 10px', fontSize:10, fontWeight:600, color:'#1D6FBF', cursor:'pointer', margin:'0 10px 8px', transition:'all .15s' }}>
        ↺ Reset to defaults
      </button>
    </>
  )
}
