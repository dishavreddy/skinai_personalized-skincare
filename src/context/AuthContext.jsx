import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../supabaseClient.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialise from existing session on mount, then subscribe to auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
  }

  const signUp = async (email, password, name) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: name?.trim() || email.split('@')[0] } },
    })
    if (error) throw new Error(error.message)
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  // Insert a completed scan into the `scans` table (no-op if not signed in)
  const saveScan = useCallback(async (scan) => {
    if (!user) return
    const { error } = await supabase.from('scans').upsert({
      id: scan.id,
      user_id: user.id,
      overall_score: scan.overall_score,
      scores: scan.scores,
      insights: scan.insights,
      routine: scan.routine,
      recommendations: scan.recommendations,
      thumbnail: scan.thumbnail ?? null,
      comparison: scan.comparison ?? null,
      created_at: scan.timestamp,
    })
    if (error) console.error('saveScan error:', error.message)
  }, [user])

  // Fetch all scans for the signed-in user, newest first
  const loadScans = useCallback(async () => {
    if (!user) return []
    const { data, error } = await supabase
      .from('scans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(30)
    if (error) { console.error('loadScans error:', error.message); return [] }
    return data
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, logout, saveScan, loadScans }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
