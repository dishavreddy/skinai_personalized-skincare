import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useScan } from '../context/ScanContext.jsx'
import AuthModal from './AuthModal.jsx'

export default function Navbar() {
  const navigate = useNavigate(); const {user,logout}=useAuth(); const {startScan}=useScan(); const [authOpen,setAuthOpen]=useState(false),[menu,setMenu]=useState(false)
  const go = (id) => { if (location.pathname !== '/') navigate(`/#${id}`); else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  return <><header className="redesign-nav-shell"><nav className="redesign-wrap redesign-nav"><Link className="redesign-logo" to="/"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14"/><path d="M6 19c4-1 6-6 10-6s6 5 10 6"/><circle cx="16" cy="16" r="2.6"/></svg>SkinAI</Link><div className="redesign-nav-links"><button onClick={()=>go('how')}>How it works</button><button onClick={()=>go('routine')}>Your routine</button><button onClick={()=>go('progress')}>Progress</button><button onClick={()=>go('privacy')}>Privacy</button></div><div className="nav-actions">{user?<div className="user-menu"><button className="user-button" onClick={()=>setMenu(!menu)}><span>{user.displayName.slice(0,1).toUpperCase()}</span>{user.displayName}</button>{menu&&<div className="dropdown"><Link to="/history" onClick={()=>setMenu(false)}>Scan History</Link><Link to="/recommendations" onClick={()=>setMenu(false)}>Recommendations</Link><button onClick={()=>{logout();setMenu(false)}}>Log out</button></div>}</div>:<button className="login" onClick={()=>setAuthOpen(true)}>Login</button>}<button className="redesign-button small" onClick={startScan}>Start a skin scan</button></div></nav></header><AuthModal open={authOpen} close={()=>setAuthOpen(false)}/></>
}
