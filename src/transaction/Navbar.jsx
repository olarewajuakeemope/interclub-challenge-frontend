import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
            <p onClick={toggleNav}>
              <a href="#back">
                <i className="material-icons">keyboard_arrow_left</i>
                <span>Members</span>
              </a>
            </p>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="material-icons">dashboard</i>
                  <p className="hidden-lg hidden-md">Dashboard</p>
                </a>
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

Navbar.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  member: PropTypes.shape({}).isRequired,
};

function select(store) {
  const { member } = store.manageTransactions;
  return {
    member,
  };
}

export default connect(select)(Navbar);