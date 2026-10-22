import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found.</p>
    <Link to="/" className="not-found-link">
      Go to Home
    </Link>
  </div>
)

export default NotFound
