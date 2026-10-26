import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {history, location} = props
  const [isOpen, setIsOpen] = useState(false)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const homeClass =
    location.pathname === '/' ? 'header-link active' : 'header-link'
  const reportsClass =
    location.pathname === '/reports' ? 'header-link active' : 'header-link'

  return (
    <nav className="header">
      <h1 className="header-logo">Daily Mood Tracker</h1>
      <button
        type="button"
        className="menu-button"
        aria-label="Menu"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
      <div className={isOpen ? 'header-links open' : 'header-links'}>
        <Link to="/" className={homeClass}>
          Home
        </Link>
        <Link to="/reports" className={reportsClass}>
          Reports
        </Link>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
