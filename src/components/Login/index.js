import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

// const logoSvg =
//   "<svg xmlns='http://www.w3.org/2000/svg' width='380' height='52' viewBox='0 0 380 52'>" +
//   "<text x='50%' y='38' text-anchor='middle' font-family='Roboto, Arial, sans-serif' font-weight='700' font-size='36' fill='white'>Daily Mood Tracker</text></svg>"
// const logoUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
//   logoSvg,
// )}`

const Login = props => {
  const {history} = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (Cookies.get('jwt_token') !== undefined) {
    return <Redirect to="/" />
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card card">
        <form className="login-form" onSubmit={onSubmitForm}>
          <h1 className="login-heading">Daily Mood Tracker</h1>
          <label className="login-label" htmlFor="username">
            USERNAME
          </label>
          <input
            id="username"
            className="login-input"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label className="login-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            id="password"
            className="login-input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="show-password-row">
            <input
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={e => setShowPassword(e.target.checked)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {errorMsg !== '' && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
