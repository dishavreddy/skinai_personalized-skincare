import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useScan } from '../context/ScanContext.jsx'
import AuthModal from './AuthModal.jsx'

export default function Navbar() {
  const navigate = useNavigate(); const {user,logout}=useAuth(); const {startScan}=useScan(); const [authOpen,setAuthOpen]=useState(false),[menu,setMenu]=useState(false)
  const go = (id) => { if (location.pathname !== '/') navigate(`/#${id}`); else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  return <><header className="nav-shell"><nav className="nav"><Link className="brand" to="/"><span>✦</span>Skin<i>AI</i></Link><div className="nav-links"><button onClick={() => go('features')}>Features</button><button onClick={startScan}>Try Scan</button><button onClick={() => go('results')}>Results</button></div><div className="nav-actions">{user?<div className="user-menu"><button className="user-button" onClick={()=>setMenu(!menu)}><span>{user.name.slice(0,1).toUpperCase()}</span>{user.name}</button>{menu&&<div className="dropdown"><Link to="/history" onClick={()=>setMenu(false)}>Scan History</Link><Link to="/recommendations" onClick={()=>setMenu(false)}>Recommendations</Link><button onClick={()=>{logout();setMenu(false)}}>Log out</button></div>}</div>:<button className="login" onClick={()=>setAuthOpen(true)}>Login</button>}<button className="button small" onClick={startScan}>Try AI Scan</button></div></nav></header><AuthModal open={authOpen} close={()=>setAuthOpen(false)}/></>
}
