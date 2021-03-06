import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions/memberActions';
import types from '../actions/types';

const FETCH_LIMIT = 2;

/**
 * Displays fetched transactions (Filtered or not)
 * in descending order of dates
 * @export
 * @class Sidebar
 * @extends {Component}
 */
class Sidebar extends Component {
  state = {
    activeTransaction: 0,
    filter: {},
    pagination: null,
    transRecieved: false,
    count: null,
  }

  async componentWillReceiveProps(nextProps) {
    const { transactions, filter, count } = nextProps;
    const { transRecieved } = this.state;

    // Make first transaction active and dispatch to store
    if (transactions) {
      this.handleClick(transactions[0], 0);
    }

    // Create pagination on initial transaction count
    if (!transRecieved && count > 0) {
      await this.setState({ transRecieved: true, count });
      this.renderPagination(count);
    }

    // Rerender pagination on new filter recieved
    if (count !== this.state.count) {
      if (this.compareFilter(filter)) {
        await this.setState({ filter, count });
        this.renderPagination(count);
      }
    }
  }

  compareFilter = (newFilter) => {
    const { filter } = this.state;
    return (JSON.stringify(newFilter) !== JSON.stringify(filter));
  }

  // handle pagination button clicks
  handlePageClick = (data) => {
    const { dispatch, member, filter } = this.props;
    const selected = data.selected;
    const offset = Math.ceil(selected * FETCH_LIMIT);
    const errType = types.MAIN_FETCH_ERROR;

    actions.getTransaction(errType, dispatch, member.id, offset, filter);
  };

  // Dispatch clicked transaction as active to the store
  handleClick = (transaction, index) => {
    const { dispatch } = this.props;
    this.setState({
      activeTransaction: index,
    });
    actions.setCurrentTransaction(transaction, dispatch);
  }

  // 
  renderTransactions = () => {
    const {
      transactions,
      count,
      filter,
      dispatch,
      member
    } = this.props;

    const errType = types.MAIN_FETCH_ERROR;

    // Create clear button only if filter is searched
    const clearButton = filter ?
      (
        <p className="ml-20">
          <a
            href="#/"
            className="btn btn-primary"
            onClick={() => actions.getTransaction(errType, dispatch, member.id, 0, false)}
          >
           Clear Filter
          </a>
        </p>
      ) :
      null;

    // Rendered if fetch returns no transaction
    if (count < 1) {
      return (
        <div className="text-center">
          <h6>No Transactions</h6>
          {clearButton}
        </div>
      );
    }

    // Active class added to clicked transaction for style changing
    return transactions.map((transaction, index) => {
      const { id, date } = transaction;
      return (
        <li
          key={id}
          className={
            this.state.activeTransaction === index ?
              'active' : ''
          }
          onClick={() => this.handleClick(transaction, index)}
        >
          <a href="#/">
            <h4><em>Transaction {id.substring(0, 5)}...</em></h4>
            <p>on: {date.substring(0, 10)}</p>
          </a>
        </li>
      );
    });
  }

  renderPagination = async (count) => {
    if (!count || count < 1) {
      await this.setState({ pagination: null });
    } else {
    // Reset state to reset pagination component
      await this.setState({ pagination: true });
      await this.setState({
        pagination: (
          <ReactPaginate
            breakLabel={<span>...</span>}
            breakClassName={'break-me'}
            pageCount={Math.ceil(count / FETCH_LIMIT)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            previousClassName={'pagination-prev'}
            nextClassName={'pagination-next'}
            pageLinkClassName={'pagination-anchor'}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            previousLabel={
              <a href="">
                <i className="material-icons">keyboard_arrow_left</i>
              </a>
            }
            nextLabel={
              <a href="">
                <i className="material-icons">keyboard_arrow_right</i>
              </a>
            }

          />
        ),
      });
    }
  }

  render() {
    const {
      count,
      transactions,
      filter,
      error
    } = this.props;

    const { pagination } = this.state;
    let filterText = null;

    // Render appropriate singular or plural text
    const transText = count > 1 ? 'Transactions' : 'Transaction';

    // Rendered if loading or error is true
    const RippleImg = (
      <li className="error-img">
        <img src="/assets/img/ripple.gif" alt="error" />
      </li>
    );
    const loadingImg = (error || !transactions) && RippleImg;

    // prepare error message to inform user
    const errorText = error && (<li>{error}</li>);

    // prepare filter message to inform user
    if (filter) {
      const { type, date } = filter;

      const typeText = type === 0 ? null :
        (<span>Type: {type}</span>); // Render only if By Type filter is selected

      const dateText = date === 0 ? null :
        (<span>Date: {date}</span>);// Render only if By Date filter is selected

      filterText = (
        <small><em>Filtered by: </em>{typeText} {dateText}</small>
      );
    }

    return (
      <div className="sidebar" data-color="purple">
        <div className="logo">
          <a
            href="https://interclub.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-left"
          >
            <img src="/assets/logo_48x48.png" alt="site logo" />
          </a>
          <span className="ml-20 bg-text font-20 trans-text">{count} {transText}</span>
          {filterText}
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {errorText || loadingImg || this.renderTransactions()}
          </ul>
          {transactions && pagination}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  count: PropTypes.number,
  member: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function select(store) {
  const { member, filter, errors } = store.manageTransactions;
  const { count, transactions } = store.manageTransactions.transactions;
  return {
    count,
    transactions,
    member,
    filter,
    error: errors.main,
  };
}

export default connect(select)(Sidebar);
