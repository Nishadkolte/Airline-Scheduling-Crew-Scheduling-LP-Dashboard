// SeasonTab.jsx — Section C: monthly crew cost by season
import { SEASON_DATA } from '../data.js'

export default function SeasonTab({ assumptions }) {
  const seasonColor = s => s.includes('Peak') ? '#92400E' : s.includes('Low') ? '#065F46' : s.includes('Winter') ? '#1D6FBF' : '#64748B'
  const seasonBg    = s => s.includes('Peak') ? '#FFFBEB' : s.includes('Low') ? '#ECFDF5' : s.includes('Winter') ? '#EFF6FF' : '#F8FAFF'
  return (
    <div style={{ background:'#fff', border:'1px solid #DBEAFE', borderRadius:10, margin:'0 10px 8px', padding:12 }}>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, color:'#0C4A8A', marginBottom:4 }}>
        Section C — Monthly Crew Cost by Season
      </div>
      <div style={{ fontSize:10, color:'#94A3B8', marginBottom:8 }}>Total costs update live as Section A inputs change</div>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
          <thead>
            <tr style={{ background:'#F8FAFF' }}>
              {['Month','Season','Delay ($/min)','Total Reg ($/hr)','Total OT ($/hr)'].map((h, i) => (
                <th key={i} style={{ padding:'6px 8px', textAlign:i<2?'left':'right', fontWeight:700, color:'#475569', fontSize:10, borderBottom:'2px solid #DBEAFE' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SEASON_DATA.map((row, i) => {
              const rt = (assumptions.rc  + assumptions.rsc + row.dc).toFixed(1)
              const ot = (assumptions.oc  + assumptions.rsc + row.dc).toFixed(1)
              return (
                <tr key={i} style={{ background:i%2===0?'#fff':'#FAFCFF', borderBottom:'1px solid #F1F5F9' }}>
                  <td style={{ padding:'6px 8px', fontWeight:500 }}>{row.m}</td>
                  <td style={{ padding:'6px 8px' }}>
                    <span style={{ background:seasonBg(row.s), color:seasonColor(row.s), borderRadius:4, padding:'1px 6px', fontSize:10, fontWeight:600 }}>{row.s}</span>
                  </td>
                  <td style={{ padding:'6px 8px', textAlign:'right' }}>${row.dc}</td>
                  <td style={{ padding:'6px 8px', textAlign:'right', color:'#1D6FBF', fontWeight:600 }}>${rt}</td>
                  <td style={{ padding:'6px 8px', textAlign:'right', color:'#B45309', fontWeight:600 }}>${ot}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
