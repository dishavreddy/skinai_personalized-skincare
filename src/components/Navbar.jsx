import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const go = (id) => { if (location.pathname !== '/') navigate(`/#${id}`); else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  return <header className="nav-shell"><nav className="nav"><Link className="brand" to="/"><span>✦</span>Skin<i>AI</i></Link><div className="nav-links"><button onClick={() => go('features')}>Features</button><button onClick={() => go('how')}>Try Scan</button><button onClick={() => go('results')}>Results</button><button onClick={() => go('pricing')}>Pricing</button><a href="mailto:hello@skinai.local">Contact</a></div><div className="nav-actions"><button className="login" onClick={() => alert('Account sign-in is coming soon.')}>Login</button><Link className="button small" to="/scan">Try AI Scan</Link></div></nav></header>
}
