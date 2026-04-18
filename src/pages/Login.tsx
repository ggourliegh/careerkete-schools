import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { session } = useAuth()

  useEffect(() => {
    if (session) navigate('/app', { replace: true })
  }, [session, navigate])

  useEffect(() => {
    if (searchParams.get('error')) {
      setError("That magic link didn't work — it may have expired. Try sending a new one.")
    }
  }, [searchParams])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (signInError) throw signInError
      setSent(true)
    } catch (err) {
      console.error('signInWithOtp failed:', err)
      setError("Couldn't send the email. Check your address and try again.")
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setSent(false)
    setError(null)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <div className="app">
      <header className="hdr">
        <Link to="/" className="logo" aria-label="CareerKete home">
          <div className="logo-m" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="logo-t">Career<em>Kete</em></div>
        </Link>
      </header>

      <div className="vw active">
        <main className="chat-a">
          <div className="welc">
            {sent ? (
              <>
                <div className="welc-e">📧</div>
                <h1>
                  Check your <em>email</em>
                </h1>
                <p>
                  We sent a magic link to <strong>{email}</strong>. Click it to
                  sign in. Link expires in 1 hour.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--terra)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 13,
                    fontWeight: 600,
                    marginTop: 8,
                    textDecoration: 'underline',
                  }}
                >
                  Wrong email? Try again
                </button>
              </>
            ) : (
              <>
                <h1>
                  Sign in to <em>CareerKete</em>
                </h1>
                <p>
                  Enter your email and we'll send you a magic link. No passwords
                  to remember.
                </p>
                <form
                  onSubmit={handleSubmit}
                  style={{ width: '100%', maxWidth: 360, margin: '16px auto 0' }}
                >
                  {error && (
                    <div
                      role="alert"
                      style={{
                        color: 'var(--terra)',
                        fontSize: 13,
                        fontWeight: 600,
                        marginBottom: 10,
                        textAlign: 'left',
                      }}
                    >
                      {error}
                    </div>
                  )}
                  <div className="ag-pf">
                    <label>
                      Email
                      <input
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        disabled={loading}
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="go"
                    disabled={loading || !email}
                    style={{ width: '100%', marginTop: 14, opacity: loading || !email ? 0.6 : 1 }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="loader"
                          style={{
                            borderColor: 'rgba(255,255,255,.35)',
                            borderTopColor: 'white',
                            marginRight: 8,
                            verticalAlign: 'middle',
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      'Send magic link'
                    )}
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>
                    No account? We'll create one when you sign in.
                  </p>
                </form>
              </>
            )}
            <Link
              to="/"
              style={{
                display: 'inline-block',
                marginTop: 24,
                fontSize: 13,
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
            >
              ← Back
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
