import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions/memberActions';
import types from '../actions/types';

const INITIAL_STATE = {
  type: 0,
  date: 0,
};

class Navbar extends Component {
  state = INITIAL_STATE;

  componentWillReceiveProps(nextProps) {
    const { filter } = nextProps;
    if (typeof filter === 'boolean' && !filter) {
      this.setState(INITIAL_STATE);
    }
  }

  handleSelect = (event) => {
    const { name, value } = event.target;
    const stateObj = {};
    stateObj[name] = value;
    this.setState(stateObj);
  }

  handleClick = () => {
    const { dispatch, member } = this.props;
    const { date, type } = this.state;
    if (date !== 0 || type !== 0) {
      actions.getTransaction(types.MAIN_FETCH_ERROR, dispatch, member.id, 0, this.state);
      dispatch(actions.applyFilter(this.state));
    }
  }

  render() {
    const { toggleNav } = this.props;
    const { date, type } = this.state;
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
            <h4 onClick={toggleNav}>
              <a href="#back">
                <i
                  className="material-icons font-30"
                >
                keyboard_arrow_left
                </i>
                <span>Members</span>
              </a>
            </h4>
          </div>
          <div className="collapse navbar-collapse">
            <form className="navbar-form navbar-right" role="search">
              <span className="font-30">Filter</span>
              <div className="form-group  input-lg is-empty">
                <select
                  className="input-lg ml-20"
                  name="type"
                  value={type}
                  onChange={this.handleSelect}
                >
                  <option value={0}>Type</option>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                  <option value="all types">All Types</option>
                </select>
                <select
                  className="input-lg ml-20"
                  name="date"
                  value={date}
                  onChange={this.handleSelect}
                >
                  <option value={0}>Date Posted</option>
                  <option value="Last Day">Last Day</option>
                  <option value="Last Week">Last Week</option>
                  <option value="Last 6 Months">Last 6 Months</option>
                  <option value="All Day">All Day</option>
                </select>
                <span className="ml-20">
                  <a
                    href="#/"
                    className="btn btn-primary"
                    onClick={this.handleClick}
                  >
                  Search
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  member: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function select(store) {
  const { member, filter } = store.manageTransactions;
  return {
    member,
    filter,
  };
}

export default connect(select)(Navbar);
