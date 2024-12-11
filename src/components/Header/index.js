import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {activeStatus: false}

  onClickMenu = () => {
    const {activeStatus} = this.state
    this.setState({activeStatus: !activeStatus})
  }

  render() {
    const {activeStatus} = this.state
    return (
      <div className="headerDivContainer">
        <div>
          <nav className="sm-sr-heading-container">
            <Link to="/" className="link-to-headingRoute">
              <h1 className="headingRoute">GitHub Profile Visualizer</h1>
            </Link>
            <div className="menu-container">
              <button
                type="button"
                className="menu-button"
                onClick={this.onClickMenu}
              >
                <img
                  src="https://res.cloudinary.com/diqwk5cdp/image/upload/v1731912175/menu_bdafjs.png"
                  alt="menu"
                />
              </button>
            </div>
          </nav>
          {activeStatus && (
            <div className="menu-list-container">
              <ul className="list-container">
                <li className="list-item-link">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-item-link">
                  <Link to="/repositories">Repositories</Link>
                </li>
                <li className="list-item-link">
                  <Link to="/analysis">Analysis</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="lg-nav-items">
          <nav className="lg-nav-items-container">
            <Link to="/" className="link-to-headingRoute">
              <h1 className="headingRoute">GitHub Profile Visualizer</h1>
            </Link>
            <ul className="categories">
              <li className="list-item-link">
                <Link to="/" className="link-item">
                  Home
                </Link>
              </li>
              <li className="list-item-link">
                <Link to="/repositories" className="link-item">
                  Repositories
                </Link>
              </li>
              <li className="list-item-link">
                <Link to="/analysis" className="link-item">
                  Analysis
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default Header
