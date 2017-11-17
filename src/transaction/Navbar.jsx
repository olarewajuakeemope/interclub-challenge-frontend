import React, { Component } from 'react';

class Navbar extends Component {
  state = {}

  render() {
    const { toggleNav } = this.props;
    return (
      <nav className="navbar navbar-transparent navbar-absolute">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <span onClick={toggleNav}>
              <a href="#back">
                <i className="material-icons">keyboard_arrow_left</i>
                <span>Members</span>
              </a>
            </span>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="material-icons">dashboard</i>
                  <p className="hidden-lg hidden-md">Dashboard</p>
                </a>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="material-icons">notifications</i>
                  <span className="notification">5</span>
                  <p className="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">Mike John responded to your email</a>
                  </li>
                  <li>
                    <a href="#">You have 5 new tasks</a>
                  </li>
                  <li>
                    <a href="#">You're now friend with Andrew</a>
                  </li>
                  <li>
                    <a href="#">Another Notification</a>
                  </li>
                  <li>
                    <a href="#">Another One</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="material-icons">person</i>
                  <p className="hidden-lg hidden-md">Profile</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
