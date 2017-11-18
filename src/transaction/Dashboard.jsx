import React, { Component } from 'react';
import Navbar from './Navbar';
import Main from './Main';

class Dashboard extends Component {
  state = {}

  render() {
    const { toggleNav } = this.props;
    return (
      <div className="main-panel">
        <Navbar
          toggleNav={toggleNav}
        />
        <Main />
      </div>
    );
  }
}

export default Dashboard;
