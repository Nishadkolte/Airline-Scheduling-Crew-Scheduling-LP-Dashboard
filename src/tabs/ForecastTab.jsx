import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import { FORECAST_2024, MONTHS, REGRESSION_STATS } from '../data.js'

export default function ForecastTab() {
  const chartData = MONTHS.map((m,i) => ({ m, v: FORECAST_2024[i] }))
  const card = { background:'#fff', border:'1px solid #DBEAFE', borderRadius:10, padding:'16px 18px', marginBottom:12 }
  return (
    <>
      <div style={card}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:'#0C4A8A', marginBottom:4 }}>2024 Delay Forecast (Avg Min/Departure)</div>
        <div style={{ fontSize:12, color:'#94A3B8', marginBottom:12 }}>Regression: Delay = 12.208 + 0.02563 × Period · R²=0.5509 · n=324 months</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:6, marginBottom:14 }}>
          {FORECAST_2024.map((v,i) => {
            const hi=v>22, md=v>18
            return (
              <div key={i} style={{ background:hi?'#FFF7ED':md?'#FFFBEB':'#F0FDF4', border:`1px solid ${hi?'#FED7AA':md?'#FDE68A':'#BBF7D0'}`, borderRadius:8, padding:'10px 6px', textAlign:'center' }}>
                <div style={{ fontSize:12, fontWeight:600, color:'#475569' }}>{MONTHS[i]}</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:700, color:hi?'#C2410C':md?'#B45309':'#065F46', margin:'4px 0' }}>{v.toFixed(1)}</div>
                <div style={{ fontSize:11, color:'#94A3B8' }}>min/dep</div>
                <span style={{ fontSize:10, fontWeight:700, padding:'2px 6px', borderRadius:4, background:hi?'#FED7AA':md?'#FDE68A':'#BBF7D0', color:hi?'#C2410C':md?'#B45309':'#065F46' }}>{hi?'HIGH':md?'MED':'LOW'}</span>
              </div>
            )
          })}
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={chartData}>
            <defs><linearGradient id="fgGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1D6FBF" stopOpacity={0.2}/><stop offset="95%" stopColor="#1D6FBF" stopOpacity={0.02}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
            <XAxis dataKey="m" tick={{ fontSize:12 }} axisLine={false} tickLine={false}/>
            <YAxis domain={[14,28]} tick={{ fontSize:12 }} axisLine={false} tickLine={false} width={38} tickFormatter={v=>`${v}m`}/>
            <Tooltip formatter={v=>[`${v.toFixed(1)} min/dep`,'Forecast']}/>
            <ReferenceLine y={20} stroke="#F59E0B" strokeDasharray="3 2" label={{ value:'20 min', position:'insideTopRight', fontSize:11, fill:'#B45309' }}/>
            <Area type="monotone" dataKey="v" stroke="#1D6FBF" fill="url(#fgGrad)" strokeWidth={2.5} dot={{ r:4, fill:'#1D6FBF', stroke:'#fff', strokeWidth:2 }}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={card}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:'#0C4A8A', marginBottom:10 }}>Regression Statistics</div>
        {REGRESSION_STATS.map((row,i) => (
          <div key={row.k} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:i<REGRESSION_STATS.length-1?'1px solid #F1F5F9':'none' }}>
            <div>
              <div style={{ fontSize:13, color:'#475569' }}>{row.k}</div>
              <div style={{ fontSize:11, color:'#94A3B8' }}>{row.d}</div>
            </div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:700, color:'#0C4A8A' }}>{row.v}</div>
          </div>
        ))}
      </div>
    </>
  )
}
