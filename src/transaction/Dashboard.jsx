import React, { Component } from 'react';
import Navbar from './Navbar';

class Dashboard extends Component {
  state = {}

  render() {
    const { toggleNav, id } = this.props;
    return (
      <div className="main-panel">
        <Navbar toggleNav={toggleNav} />
        <div className="content" />
      </div>
    );
  }
}

export default Dashboard;
