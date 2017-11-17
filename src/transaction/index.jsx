import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import fetchTransaction from '../actions/memberActions';

class Transaction extends Component {
  componentWillMount() {
    const { dispatch, id } = this.props;
    axios.get(`http://localhost:4000/api/transactions/${id}`)
      .then((result) => {
        dispatch(fetchTransaction(result.data));
      })
      .catch(err => console.log(err));
  }

  render() {
    const { toggleNav, id } = this.props;
    return (
      <div className="wrapper">
        <Dashboard toggleNav={toggleNav} id={id} />
        <Sidebar />
      </div>
    );
  }
}

export default connect()(Transaction);
