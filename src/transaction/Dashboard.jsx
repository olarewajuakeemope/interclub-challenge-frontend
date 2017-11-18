import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';

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
        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  toggleNav: PropTypes.func.isRequired,
};

export default Dashboard;
