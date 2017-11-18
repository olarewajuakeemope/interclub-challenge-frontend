import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import actions from '../actions/memberActions';

class Transaction extends Component {
  componentWillMount() {
    const { dispatch, member } = this.props;
    actions.getTransaction(dispatch, member.id, 0, false);
  }

  render() {
    const { toggleNav } = this.props;
    return (
      <div className="wrapper">
        <Dashboard
          toggleNav={toggleNav}
        />
        <Sidebar />
      </div>
    );
  }
}

Transaction.propTypes = {
  dispatch: PropTypes.func.isRequired,
  toggleNav: PropTypes.func.isRequired,
  member: PropTypes.shape().isRequired,
};

function select(store) {
  return {
    member: store.manageTransactions.member,
  };
}

export default connect(select)(Transaction);
