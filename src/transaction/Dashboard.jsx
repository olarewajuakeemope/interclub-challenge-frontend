import React, { Component } from 'react';
import Navbar from './Navbar';

class Dashboard extends Component {
  state = {}

  render() {
    const { toggleNav, member } = this.props;
    return (
      <div className="main-panel">
        <Navbar
          toggleNav={toggleNav}
          member={member}
        />
        <div className="content" />
      </div>
    );
  }
}

export default Dashboard;
