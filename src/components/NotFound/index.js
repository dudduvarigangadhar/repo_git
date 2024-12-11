import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  //   <div className="page-not-found-container">
  <div className="page-container">
    <img
      src="https://res.cloudinary.com/diqwk5cdp/image/upload/v1732070791/Group_7519_fwq39j.png"
      alt="page not found"
      className="page-not-found-img"
    />
    <h1 className="page-not-found-heading">PAGE NOT FOUND</h1>
    <p className="page-not-found-description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/" className="button-container">
      <button type="button" className="not-found-go-to-home-page-button">
        Go to Home
      </button>
    </Link>
  </div>
  //   </div>
)

export default NotFound
