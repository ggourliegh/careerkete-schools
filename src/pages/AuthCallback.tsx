import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export default function AuthCallback() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const errorDesc = searchParams.get('error_description')
    const errorCode = searchParams.get('error')
    if (errorDesc || errorCode) {
      navigate(
        `/login?error=${encodeURIComponent(errorDesc || errorCode || 'unknown')}`,
        { replace: true },
      )
      return
    }
    if (loading) return
    if (session) {
      navigate('/app', { replace: true })
    } else {
      navigate('/login', { replace: true })
    }
  }, [session, loading, searchParams, navigate])

  return (
    <div className="app">
      <div className="vw active">
        <main className="chat-a">
          <div className="welc">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <span
                className="loader"
                style={{ width: 28, height: 28, borderWidth: 3 }}
              />
            </div>
            <h1>
              Signing you <em>in</em>…
            </h1>
            <p>Just a moment.</p>
          </div>
        </main>
      </div>
    </div>
  )
}
