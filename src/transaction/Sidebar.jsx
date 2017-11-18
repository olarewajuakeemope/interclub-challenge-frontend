import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions/memberActions';

const FETCH_LIMIT = 2;

class Sidebar extends Component {
  state = {
    activeTransaction: 0,
  }

  handlePageClick = (data) => {
    const { dispatch, member, filter } = this.props;
    const selected = data.selected;
    const offset = Math.ceil(selected * FETCH_LIMIT);
    actions.getTransaction(dispatch, member.id, offset, filter);
  };

  handleClick = (transaction, index) => {
    this.setState({
      activeTransaction: index,
    });
  }

  rendertransactions = () => {
    const { transactions } = this.props;
    return transactions.map((transaction, index) => {
      const { id, type, amount, date } = transaction;
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
            <h4>{type}: <em>${amount}</em></h4>
            <p>on: {date.substring(0, 10)}</p>
          </a>
        </li>
      );
    });
  }

  render() {
    const { count, transactions } = this.props;
    const transText = count > 1 ? 'Transactions' : 'Transaction';
    return (
      <div className="sidebar" data-color="purple" data-image="../assets/img/sidebar-1.jpg">
        <div className="logo">
          <a
            href="https://interclub.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-left"
          >
            <img src="/assets/logo_48x48.png" alt="site logo" />
          </a>
          <span className="ml-20 bg-text font-30 trans-text">{count} {transText}</span>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {transactions && this.rendertransactions()}
          </ul>
          <ReactPaginate
            previousLabel={<a href=""><i className="material-icons">keyboard_arrow_left</i></a>}
            nextLabel={<a href=""><i className="material-icons">keyboard_arrow_right</i></a>}
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
          />
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  count: PropTypes.number.isRequired,
  member: PropTypes.shape({}).isRequired,
  filter: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
};

function select(store) {
  const { member, filter } = store.manageTransactions;
  const { count, transactions } = store.manageTransactions.transactions;
  return {
    count,
    transactions,
    member,
    filter,
  };
}

export default connect(select)(Sidebar);
