import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const userKey = 'skinai-current-user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem(userKey) || 'null'))
  const signIn = (email, password, name) => {
    if (!email || !password) throw new Error('Email and password are required.')
    const account = { email: email.trim().toLowerCase(), name: name?.trim() || email.split('@')[0] }
    localStorage.setItem(userKey, JSON.stringify(account)); setUser(account)
  }
  const logout = () => { localStorage.removeItem(userKey); setUser(null) }
  const historyKey = () => user ? `skinai-history:${user.email}` : null
  const saveScan = (scan) => {
    if (!user) return
    // Demo-only storage. Replace with a real authenticated database (Supabase/Firebase/Postgres) before production.
    const key = historyKey(); const history = JSON.parse(localStorage.getItem(key) || '[]')
    if (history.some(item => item.id === scan.id)) return
    localStorage.setItem(key, JSON.stringify([scan, ...history].slice(0, 30)))
  }
  const scans = () => user ? JSON.parse(localStorage.getItem(historyKey()) || '[]') : []
  return <AuthContext.Provider value={{ user, signIn, logout, saveScan, scans }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
