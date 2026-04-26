// ForecastTab.jsx — 2024 delay forecast + regression stats
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import { FORECAST_2024, MONTHS, REGRESSION_STATS } from '../data.js'

export default function ForecastTab() {
  const chartData = MONTHS.map((m, i) => ({ m, v: FORECAST_2024[i] }))
  const card = { background:'#fff', border:'1px solid #DBEAFE', borderRadius:10, margin:'0 10px 8px', padding:12 }
  return (
    <>
      <div style={card}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, color:'#0C4A8A', marginBottom:4 }}>
          2024 Delay Forecast (Avg Min/Departure)
        </div>
        <div style={{ fontSize:10, color:'#94A3B8', marginBottom:10 }}>
          Regression: Delay = 12.208 + 0.02563 × Period · R²=0.5509 · n=324 months (1997–2023)
        </div>
        {/* Forecast tiles */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:4, marginBottom:10 }}>
          {FORECAST_2024.map((v, i) => {
            const hi = v > 22, md = v > 18
            return (
              <div key={i} style={{ background:hi?'#FFF7ED':md?'#FFFBEB':'#F0FDF4', border:`1px solid ${hi?'#FED7AA':md?'#FDE68A':'#BBF7D0'}`, borderRadius:7, padding:'6px 4px', textAlign:'center' }}>
                <div style={{ fontSize:9, fontWeight:600, color:'#475569' }}>{MONTHS[i]}</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:hi?'#C2410C':md?'#B45309':'#065F46', margin:'2px 0' }}>{v.toFixed(1)}</div>
                <div style={{ fontSize:8, color:'#94A3B8' }}>min/dep</div>
                <span style={{ fontSize:8, fontWeight:700, padding:'1px 4px', borderRadius:3, background:hi?'#FED7AA':md?'#FDE68A':'#BBF7D0', color:hi?'#C2410C':md?'#B45309':'#065F46' }}>
                  {hi ? 'HIGH' : md ? 'MED' : 'LOW'}
                </span>
              </div>
            )
          })}
        </div>
        {/* Forecast line chart */}
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fgGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#1D6FBF" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#1D6FBF" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
            <XAxis dataKey="m" tick={{ fontSize:9 }} axisLine={false} tickLine={false}/>
            <YAxis domain={[14, 28]} tick={{ fontSize:9 }} axisLine={false} tickLine={false} width={32} tickFormatter={v => `${v}m`}/>
            <Tooltip formatter={(v) => [`${v.toFixed(1)} min/dep`, 'Forecast']}/>
            <ReferenceLine y={20} stroke="#F59E0B" strokeDasharray="3 2" label={{ value:'20min', position:'insideTopRight', fontSize:9, fill:'#B45309' }}/>
            <Area type="monotone" dataKey="v" name="Forecast" stroke="#1D6FBF" fill="url(#fgGrad)" strokeWidth={2.5}
              dot={{ r:3, fill:'#1D6FBF', stroke:'#fff', strokeWidth:1.5 }}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Regression statistics */}
      <div style={card}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, color:'#0C4A8A', marginBottom:8 }}>Regression Statistics</div>
        {REGRESSION_STATS.map((row, i) => (
          <div key={row.k} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'5px 0', borderBottom: i < REGRESSION_STATS.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
            <div>
              <div style={{ fontSize:11, color:'#475569' }}>{row.k}</div>
              <div style={{ fontSize:9, color:'#94A3B8' }}>{row.d}</div>
            </div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, color:'#0C4A8A' }}>{row.v}</div>
          </div>
        ))}
      </div>
    </>
  )
}
