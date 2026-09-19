import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function RecommendationsPage() {
  const { user, loadScans } = useAuth()
  const [latest, setLatest] = useState(null)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (!user) return
    setFetching(true)
    loadScans().then(data => { setLatest(data[0] ?? null); setFetching(false) })
  }, [user, loadScans])

  return (
    <>
      <Navbar />
      <main className="history-page">
        <div className="section-label">YOUR ACCOUNT</div>
        <h1>Recommendations</h1>
        {!user || fetching ? (
          <div className="empty">
            <p>{fetching ? 'Loading…' : 'Complete a scan while signed in to unlock personalized routine recommendations.'}</p>
            {!user && <Link className="button" to="/scan">Start a scan</Link>}
          </div>
        ) : !latest ? (
          <div className="empty">
            <p>Complete a scan while signed in to unlock personalized routine recommendations.</p>
            <Link className="button" to="/scan">Start a scan</Link>
          </div>
        ) : (
          <>
            <p className="page-intro">Based on your latest scan from {new Date(latest.created_at).toLocaleDateString()}.</p>
            <div className="routine-grid">
              {Object.entries(latest.routine).map(([time, items]) => (
                <div className="result-box" key={time}>
                  <div className="section-label">{time} ROUTINE</div>
                  <ol>{items.map(item => <li key={item}>{item}</li>)}</ol>
                </div>
              ))}
            </div>
            <section className="result-box recommendation-panel">
              <div className="section-label">ROUTINE MATCHED TO YOU</div>
              <div className="products">
                {latest.recommendations.map(item => (
                  <button key={item.name} className="product-card" onClick={() => alert(`${item.name}: ${item.reason}`)}>
                    <b>{item.name}</b>
                    <span>{item.reason}</span>
                    <small>{item.match}% match · click for detail</small>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
