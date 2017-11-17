import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Sidebar extends Component {
  state = { pageCount: 20 }

  render() {
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
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className="active">
              <a href="dashboard.html">
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </a>
            </li>
            <li>
              <a href="./user.html">
                <i className="material-icons">person</i>
                <p>User Profile</p>
              </a>
            </li>
          </ul>
          <ReactPaginate
            previousLabel={<span><i className="material-icons">keyboard_arrow_left</i></span>}
            nextLabel={<span><i className="material-icons">keyboard_arrow_right</i></span>}
            breakLabel={<span>...</span>}
            breakClassName={'break-me'}
            pageCount={this.props.count}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
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
  transaction: PropTypes.shape([]).isRequired,
};

function select(store) {
  const { count, transactions } = store.manageTransactions.transactions;
  return {
    count,
    transactions,
  };
}

export default connect(select)(Sidebar);
