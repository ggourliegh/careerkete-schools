import { Link } from 'react-router-dom'

export default function Landing() {
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
        <div className="hdr-a">
          <Link to="/login" className="ib" aria-label="Saved">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </Link>
          <Link to="/login" className="ib" aria-label="Profile">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </header>

      <div className="tabs">
        <Link to="/login" className="tab active">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Chat
        </Link>
        <Link to="/login" className="tab">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Browse
        </Link>
        <Link to="/login" className="tab">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.49 8.49l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.49-8.49l2.83-2.83" />
          </svg>
          Agent
        </Link>
      </div>

      <div className="vw active">
        <main className="chat-a">
          <div className="welc">
            <div className="welc-e">🌱</div>
            <h1>
              Kia ora — let's find <em>your</em> thing
            </h1>
            <p>
              No quizzes. No pressure. Just a kōrero with a friend who's curious
              about what makes you tick.
            </p>
            <Link to="/login" className="go">
              Let's chat →
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
