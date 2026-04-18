import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'

export default function AppHome() {
  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="app">
      <header className="hdr">
        <Link to="/app" className="logo" aria-label="CareerKete home">
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
            <div className="welc-e">🌿</div>
            <h1>
              You're <em>signed in</em>
            </h1>
            <p>
              Signed in as <strong>{user?.email}</strong>
            </p>
            <button type="button" onClick={handleSignOut} className="go">
              Sign out
            </button>
            <p style={{ marginTop: 24, fontSize: 13, color: 'var(--muted)' }}>
              Real chat / browse / agent coming soon.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
