import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const descriptions = {
  acne: 'Localized red-spot signal',
  redness: 'Overall color variation signal',
  hydration: 'Brightness and color balance',
  glow: 'Brightness consistency',
  tone_evenness: 'Luminance consistency',
  texture: 'Fine-detail signal',
  dark_circles: 'Under-eye luminance',
  oiliness: 'Specular highlight signal',
  smoothness: 'Inverse texture variation',
}

function Ring({ label, value, color }) {
  return (
    <div className="score-ring" style={{ '--score': `${value * 3.6}deg`, '--ring': color }}>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  )
}

function DeltaBadge({ value }) {
  if (value === 0) return <span className="delta neutral">±0</span>
  const positive = value > 0
  return (
    <span className={`delta ${positive ? 'positive' : 'negative'}`}>
      {positive ? '▲' : '▼'} {Math.abs(value)}
    </span>
  )
}

export default function ResultsPage() {
  const { state } = useLocation()
  const nav = useNavigate()
  const { user, saveScan } = useAuth()

  useEffect(() => {
    if (state?.scores && user) saveScan(state)
  }, [state, user, saveScan])

  if (!state?.scores) return (
    <>
      <Navbar />
      <main className="empty">
        <h1>No scan yet.</h1>
        <button className="button" onClick={() => nav('/scan')}>Upload a facial image</button>
      </main>
    </>
  )

  const s = state.scores
  const overall = state.overall_score
  const cmp = state.comparison

  return (
    <>
      <Navbar />
      <main className="results-page">
        <div className="result-head">
          <div>
            <div className="section-label">YOUR SCAN</div>
            <h1>Skin report</h1>
            <p>Scores are computed from the uploaded image's color, brightness, contrast and texture features. They are not medical diagnoses.</p>
            {!user && <p className="save-note">Log in before your next scan to save it to history.</p>}
          </div>
          <button className="button ghost" onClick={() => nav('/scan')}>New scan</button>
        </div>

        <section className="rings">
          <Ring label="SKIN SCORE" value={overall} color="#9765eb" />
          <Ring label="HYDRATION" value={s.hydration} color="#8cc7fa" />
          <Ring label="GLOW" value={s.glow} color="#ef95c9" />
        </section>

        <section className="metric-board">
          {Object.entries(descriptions).map(([key, label]) => (
            <article key={key}>
              <div>
                <span>{key.replace('_', ' ')}</span>
                <b>
                  {s[key]}<small>/100</small>
                  {cmp && <DeltaBadge value={cmp.metric_changes[key]} />}
                </b>
              </div>
              <p>{label}</p>
              <i style={{ width: `${s[key]}%` }} />
            </article>
          ))}
        </section>

        <section className="result-grid">
          <div className="result-box">
            <div className="section-label">PERSONALIZED INSIGHTS</div>
            {state.insights.map(x => <p key={x}>• {x}</p>)}
          </div>
          <div className="result-box">
            <div className="section-label">TRACK SKIN PROGRESS</div>
            <p>Today's visual score: <b>{overall}/100</b></p>
            <div className="progress-bars">
              {[55, 61, 57, 68, 72, overall].map((v, i) => <i key={i} style={{ height: `${v}%` }} />)}
            </div>
            <small>Add a second scan to compare image-derived change.</small>
          </div>
        </section>

        <section className="routine-grid">
          {Object.entries(state.routine).map(([time, items]) => (
            <div className="result-box" key={time}>
              <div className="section-label">{time} ROUTINE</div>
              <ol>{items.map(item => <li key={item}>{item}</li>)}</ol>
            </div>
          ))}
        </section>

        <section className="result-box">
          <div className="section-label">RECOMMENDED FOR YOU</div>
          <div className="products">
            {state.recommendations.map(p => (
              <button key={p.name} className="product-card" onClick={() => alert(`${p.name}: ${p.reason}`)}>
                <b>{p.name}</b>
                <span>{p.reason}</span>
                <small>{p.match}% match · click for detail</small>
              </button>
            ))}
          </div>
        </section>

        {cmp && (
          <section className="result-box comparison">
            <div className="section-label">BEFORE / AFTER COMPARISON</div>
            <p>
              Overall score change (baseline → now):{' '}
              <b className={cmp.overall_change >= 0 ? 'positive' : 'negative'}>
                {cmp.overall_change > 0 ? '+' : ''}{cmp.overall_change} points
              </b>
            </p>
            <div className="comparison-grid">
              {Object.entries(cmp.metric_changes).map(([k, v]) => (
                <div key={k} className={`comparison-item ${v > 0 ? 'positive' : v < 0 ? 'negative' : 'neutral'}`}>
                  <span className="comp-label">{k.replace('_', ' ')}</span>
                  <span className="comp-delta">{v > 0 ? '▲ +' : v < 0 ? '▼ ' : '± '}{v}</span>
                </div>
              ))}
            </div>
            <small>Positive numbers = improved. Negative = declined. Scores reflect image conditions, not a clinical measurement.</small>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
