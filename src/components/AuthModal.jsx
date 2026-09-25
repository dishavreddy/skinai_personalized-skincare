import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function AuthModal({ open, close }) {
  const { signIn, signUp } = useAuth()
  const [signup, setSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (signup) {
        await signUp(email, password, name)
        // Supabase sends a confirmation email by default.
        // If email confirm is disabled in your project, the user is logged in immediately.
        setError('Account created! Check your email to confirm, then sign in.')
        setSignup(false)
      } else {
        await signIn(email, password)
        close()
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && close()}>
      <form className="auth-modal" onSubmit={submit}>
        <button type="button" className="modal-close" onClick={close}>×</button>
        <div className="section-label">SKINAI ACCOUNT</div>
        <h2>{signup ? 'Create your account' : 'Hi, welcome to SkinAI'}</h2>
        {signup && (
          <label>Name<input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" /></label>
        )}
        <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
        <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" required /></label>
        {error && <div className="error">{error}</div>}
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Please wait…' : signup ? 'Create account' : 'Sign in'}
        </button>
        <button className="text-button" type="button" onClick={() => { setSignup(!signup); setError('') }}>
          {signup ? 'Already have an account? Sign in' : 'New here? Create an account'}
        </button>
      </form>
    </div>
  )
}
