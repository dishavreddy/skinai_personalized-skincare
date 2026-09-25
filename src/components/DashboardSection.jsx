import { useState } from 'react'
import { useScan } from '../context/ScanContext.jsx'

const routineSteps = {
  morning: ['Gentle cleanser', 'Antioxidant serum', 'Barrier-supporting moisturizer', 'Daily SPF'],
  evening: ['Gentle cleanser', 'Targeted treatment', 'Hydrating serum', 'Barrier-supporting moisturizer'],
}

export default function DashboardSection(){
  const { startScan } = useScan(); const [time, setTime] = useState('morning'); const label = time === 'morning' ? 'Morning' : 'Evening'
  const selectTime = (next) => setTime(next)
  const keySelect = (event, next) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectTime(next) } }
  const tabStyle = (selected) => selected ? { background: 'var(--red-surface)', color: 'var(--red-ink)', boxShadow: '0 1px 3px #10182d26' } : { background: 'transparent', color: 'var(--red-muted)', boxShadow: 'none' }
  return <section id="routine" className="redesign-routine"><div className="redesign-wrap redesign-routine-grid"><div><h3>A routine that reads your map.</h3><p>Every recommendation is based on the actual visual signals found in your uploaded image.</p></div><div><div className="routine-switch" role="tablist" aria-label="Routine time"><span role="tab" tabIndex="0" aria-selected={time === 'morning'} style={tabStyle(time === 'morning')} onClick={() => selectTime('morning')} onKeyDown={event => keySelect(event, 'morning')}>Morning</span><span role="tab" tabIndex="0" aria-selected={time === 'evening'} style={tabStyle(time === 'evening')} onClick={() => selectTime('evening')} onKeyDown={event => keySelect(event, 'evening')}>Evening</span></div><ol>{routineSteps[time].map((step,index)=><li key={step}><b>{index+1}</b><div><h4>{step}</h4><p>Your completed scan will explain why this {label.toLowerCase()} step is suggested and where it fits in your routine.</p></div><em>After scan</em></li>)}</ol><button className="redesign-text-action" onClick={startScan}>Analyze a photo for your routine →</button></div></div></section>}
