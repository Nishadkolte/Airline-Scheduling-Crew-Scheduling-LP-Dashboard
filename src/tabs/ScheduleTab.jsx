// ScheduleTab.jsx — Monthly scheduling plan table
import { fmt, isPeak } from '../utils.js'

export default function ScheduleTab({ data, totals, assumptions }) {
  return (
    <div style={{ background:'#fff', border:'1px solid #DBEAFE', borderRadius:10, margin:'0 10px 8px', padding:12 }}>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, color:'#0C4A8A', marginBottom:4 }}>Monthly Scheduling Plan — 2024</div>
      <div style={{ fontSize:10, color:'#94A3B8', marginBottom:8 }}>Regular + Overtime must equal demand · OT activates when regular cap is hit</div>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
          <thead>
            <tr style={{ background:'#F8FAFF' }}>
              {['Month','Demand','Regular','Overtime','Reserve','Cancel','Reg $','OT $','Total'].map((h,i) => (
                <th key={i} style={{ padding:'6px 8px', textAlign:i<2?'left':'right', fontWeight:700, color:'#475569', fontSize:10, borderBottom:'2px solid #DBEAFE', whiteSpace:'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i} style={{ background: i%2===0 ? '#fff' : '#FAFCFF', borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'6px 8px', fontWeight:600, color:isPeak(r.m)?'#B45309':'#1e293b' }}>
                  {r.m}{isPeak(r.m) && <span style={{ fontSize:8, background:'#FEF3C7', color:'#92400E', borderRadius:3, padding:'1px 3px', marginLeft:3 }}>PEAK</span>}
                </td>
                <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:600 }}>{r.d.toLocaleString()}</td>
                <td style={{ padding:'6px 8px', textAlign:'right', color:r.c>=assumptions.regCap?'#EF4444':'#1D6FBF', fontWeight:r.c>=assumptions.regCap?700:500 }}>
                  {r.c.toLocaleString()}{r.c >= assumptions.regCap && <span style={{ fontSize:8, color:'#EF4444', marginLeft:2 }}>MAX</span>}
                </td>
                <td style={{ padding:'6px 8px', textAlign:'right', color:r.o>0?'#B45309':'#94A3B8', fontWeight:r.o>0?700:400 }}>{r.o>0?r.o.toLocaleString():'—'}</td>
                <td style={{ padding:'6px 8px', textAlign:'right', color:'#065F46' }}>{r.r}</td>
                <td style={{ padding:'6px 8px', textAlign:'center' }}>
                  <span style={{ background:r.k>0?'#FEE2E2':'#DCFCE7', color:r.k>0?'#991B1B':'#166534', borderRadius:4, padding:'1px 6px', fontSize:10, fontWeight:600 }}>
                    {r.k > 0 ? `${r.k} ✗` : '0 ✓'}
                  </span>
                </td>
                <td style={{ padding:'6px 8px', textAlign:'right', fontSize:10, color:'#475569' }}>{fmt(r.rc)}</td>
                <td style={{ padding:'6px 8px', textAlign:'right', fontSize:10, color:r.oc>0?'#B45309':'#94A3B8', fontWeight:r.oc>0?600:400 }}>{r.oc>0?fmt(r.oc):'—'}</td>
                <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700, color:r.kc>0?'#EF4444':'#0C4A8A' }}>{fmt(r.tot)}</td>
              </tr>
            ))}
            {/* Totals row */}
            <tr style={{ background:'#EFF6FF', borderTop:'2px solid #DBEAFE' }}>
              <td style={{ padding:'6px 8px', fontWeight:700, color:'#0C4A8A' }}>TOTAL</td>
              <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700 }}>{totals.d.toLocaleString()}</td>
              <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700, color:'#1D6FBF' }}>{totals.c.toLocaleString()}</td>
              <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700, color:'#B45309' }}>{totals.o.toLocaleString()}</td>
              <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700, color:'#065F46' }}>{totals.r.toLocaleString()}</td>
              <td style={{ padding:'6px 8px', textAlign:'center', fontWeight:700, color:totals.k>0?'#991B1B':'#15803D' }}>{totals.k > 0 ? `${totals.k} ✗` : '0 ✓'}</td>
              <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700 }}>{fmt(totals.rc)}</td>
              <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700, color:'#B45309' }}>{fmt(totals.oc)}</td>
              <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700, color:'#0C4A8A', fontSize:13 }}>{fmt(totals.tot)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
