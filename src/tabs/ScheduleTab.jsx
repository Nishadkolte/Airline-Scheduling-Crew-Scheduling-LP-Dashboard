import { fmt, isPeak } from '../utils.js'

export default function ScheduleTab({ data, totals, assumptions }) {
  return (
    <div style={{ background:'#fff', border:'1px solid #DBEAFE', borderRadius:11, padding:'20px 24px', marginBottom:16 }}>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:17, fontWeight:700, color:'#0C4A8A', marginBottom:6 }}>Monthly Scheduling Plan — 2024</div>
      <div style={{ fontSize:14, color:'#94A3B8', marginBottom:16 }}>Regular + Overtime must equal demand · OT activates when regular cap is hit</div>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:15 }}>
          <thead><tr style={{ background:'#F8FAFF' }}>
            {['Month','Demand','Regular (Cₜ)','Overtime (Oₜ)','Reserve (Rₜ)','Cancel (Kₜ)','Reg Cost','OT Cost','Total'].map((h,i)=>(
              <th key={i} style={{ padding:'12px 14px', textAlign:i<2?'left':'right', fontWeight:700, color:'#475569', fontSize:14, borderBottom:'2px solid #DBEAFE', whiteSpace:'nowrap' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {data.map((r,i) => (
              <tr key={i} style={{ background:i%2===0?'#fff':'#FAFCFF', borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px 14px', fontWeight:600, color:isPeak(r.m)?'#B45309':'#1e293b' }}>
                  {r.m}{isPeak(r.m)&&<span style={{ fontSize:11, background:'#FEF3C7', color:'#92400E', borderRadius:4, padding:'2px 5px', marginLeft:5 }}>PEAK</span>}
                </td>
                <td style={{ padding:'12px 14px', textAlign:'right', fontWeight:600 }}>{r.d.toLocaleString()}</td>
                <td style={{ padding:'12px 14px', textAlign:'right', color:r.c>=assumptions.regCap?'#EF4444':'#1D6FBF', fontWeight:r.c>=assumptions.regCap?700:500 }}>
                  {r.c.toLocaleString()}{r.c>=assumptions.regCap&&<span style={{ fontSize:11, color:'#EF4444', marginLeft:3 }}>MAX</span>}
                </td>
                <td style={{ padding:'12px 14px', textAlign:'right', color:r.o>0?'#B45309':'#94A3B8', fontWeight:r.o>0?700:400 }}>{r.o>0?r.o.toLocaleString():'—'}</td>
                <td style={{ padding:'12px 14px', textAlign:'right', color:'#065F46' }}>{r.r}</td>
                <td style={{ padding:'12px 14px', textAlign:'center' }}>
                  <span style={{ background:r.k>0?'#FEE2E2':'#DCFCE7', color:r.k>0?'#991B1B':'#166534', borderRadius:6, padding:'3px 10px', fontSize:14, fontWeight:600 }}>{r.k>0?`${r.k} ✗`:'0 ✓'}</span>
                </td>
                <td style={{ padding:'12px 14px', textAlign:'right', color:'#475569' }}>{fmt(r.rc)}</td>
                <td style={{ padding:'12px 14px', textAlign:'right', color:r.oc>0?'#B45309':'#94A3B8', fontWeight:r.oc>0?600:400 }}>{r.oc>0?fmt(r.oc):'—'}</td>
                <td style={{ padding:'12px 14px', textAlign:'right', fontWeight:700, color:r.kc>0?'#EF4444':'#0C4A8A' }}>{fmt(r.tot)}</td>
              </tr>
            ))}
            <tr style={{ background:'#EFF6FF', borderTop:'2px solid #DBEAFE', fontSize:15 }}>
              <td style={{ padding:'12px 14px', fontWeight:700, color:'#0C4A8A' }}>ANNUAL TOTAL</td>
              <td style={{ padding:'12px 14px', textAlign:'right', fontWeight:700 }}>{totals.d.toLocaleString()}</td>
              <td style={{ padding:'12px 14px', textAlign:'right', fontWeight:700, color:'#1D6FBF' }}>{totals.c.toLocaleString()}</td>
              <td style={{ padding:'12px 14px', textAlign:'right', fontWeight:700, color:'#B45309' }}>{totals.o.toLocaleString()}</td>
              <td style={{ padding:'12px 14px', textAlign:'right', fontWeight:700, color:'#065F46' }}>{totals.r.toLocaleString()}</td>
              <td style={{ padding:'12px 14px', textAlign:'center', fontWeight:700, color:totals.k>0?'#991B1B':'#15803D' }}>{totals.k>0?`${totals.k} ✗`:'0 ✓'}</td>
              <td style={{ padding:'12px 14px', textAlign:'right', fontWeight:700 }}>{fmt(totals.rc)}</td>
              <td style={{ padding:'12px 14px', textAlign:'right', fontWeight:700, color:'#B45309' }}>{fmt(totals.oc)}</td>
              <td style={{ padding:'12px 14px', textAlign:'right', fontWeight:700, color:'#0C4A8A', fontSize:17 }}>{fmt(totals.tot)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
