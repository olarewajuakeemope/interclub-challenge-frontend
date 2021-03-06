import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Offline } from 'react-detect-offline';
import TopPanelItem from './TopPanelItem';
import BodyPanel from './BodyPanel';
import actions from '../actions/memberActions';

const NETWORK_ERROR_MESSAGE = 'Request failed with status code 404';
const NETWORK_ERROR_RESPONSE = 'Check your network connection';
const INITIAL_STATE = {
  trans6months: [],
  sumTotal: 0,
  expenseTotal: 0,
  incomeTotal: 0,
  expenseCount: 0,
  incomeCount: 0,
  totalCount: 0,
  errorText: false,
  loading: false,
};

/**
 * Displays 6 months summary along
 * with selected Transaction details
 * @export
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  state = INITIAL_STATE

  componentWillMount() {
    const { member } = this.props;
    this.setState({ loading: true });

    // Fetch 6 months summary panel transactions separate from redux
    const transactions = actions.get6MonthsTransaction(member);
    transactions
      .then((result) => {
        this.setState({
          loading: false,
          trans6months: result.data.transactions,
        });
        this.processTransData();
      })
      .catch((err) => {
        const errorText = err.message === NETWORK_ERROR_MESSAGE ?
          NETWORK_ERROR_RESPONSE :
          err.message;
        this.setState({
          loading: false,
          errorText,
        });
      });
  }

  // Prepare 6 months transactions summary data
  processTransData = () => {
    const { trans6months } = this.state;
    let expenseTotal = 0;
    let incomeTotal = 0;
    let expenseCount = 0;
    let incomeCount = 0;
    trans6months.forEach((transaction) => {
      const { type, amount } = transaction;
      if (type === 'income') {
        incomeCount += 1;
        incomeTotal += amount;
      } else {
        expenseCount += 1;
        expenseTotal += amount;
      }
    });

    this.setState({
      sumTotal: (expenseTotal + incomeTotal),
      expenseTotal,
      incomeTotal,
      expenseCount,
      incomeCount,
      totalCount: trans6months.length,
    });
  }

  renderTableRows = () => {
    const { trans6months } = this.state;
    return trans6months.map((transaction) => {
      const { amount, type, id, date } = transaction;
      return (
        <tr key={id}>
          <td>{id.substring(0, 7)}...</td>
          <td>{type}</td>
          <td>{`$${amount}`}</td>
          <td>
            {date.substring(0, 10)} ({date.substring(11, 19)})
          </td>
        </tr>
      );
    });
  }

  render() {
    const {
      sumTotal,
      expenseTotal,
      incomeTotal,
      expenseCount,
      incomeCount,
      totalCount,
      errorText,
      loading,
    } = this.state;
    const { member } = this.props;
    const { first_name, last_name } = member;

    // Prepare loading and error defaults
    const RippleImg = (
      <span className="error-img">
        <img src="/assets/img/ripple.gif" alt="error" />
      </span>
    );
    const loadingImg = (errorText || loading) && RippleImg;

    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <h3>Last 6 Months At Glance</h3>
            <Offline>
              <div className="col-lg-6 col-md-12">
                <div className="alert alert-danger">
                  <div className="container-fluid">
                    <div className="alert-icon">
                      <i className="material-icons">error_outline</i>
                    </div>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true"><i className="material-icons">clear</i></span>
                    </button>
                    <b>Error Alert:</b> Internet Connection Lost
                  </div>
                </div>
              </div>
            </Offline>
          </div>
          <div className="row">
            <TopPanelItem
              color="orange"
              icon="person"
              content="Member"
              footerIcon="person"
              title={loadingImg || first_name}
              footerContent={loadingImg || `${first_name} ${last_name}`}
            />
            <TopPanelItem
              color="green"
              icon="list"
              content="All Transactions"
              footerIcon="sort"
              title={loadingImg || `$${sumTotal.toFixed(2)}`}
              footerContent={loadingImg || `${totalCount} in 6 months`}
            />
            <TopPanelItem
              color="blue"
              icon="receipt"
              content="Expense Type"
              title={loadingImg || `$${expenseTotal.toFixed(2)}`}
              footerIcon="sort"
              footerContent={loadingImg || `${expenseCount} in 6 months`}
            />
            <TopPanelItem
              color="red"
              icon="credit_card"
              content="Income Type"
              title={loadingImg || `$${incomeTotal.toFixed(2)}`}
              footerIcon="sort"
              footerContent={loadingImg || `${incomeCount} in 6 months`}
            />
          </div>
          <div className="row">
            <h3>Transaction Details</h3>
          </div>
          <div className="row">
            <BodyPanel />
            <div className="col-lg-6 col-md-12">
              <div className="card">
                <div className="card-header" data-background-color="orange">
                  <h4 className="title">Summary</h4>
                  <p className="category">Last 6 Months Transactions</p>
                </div>
                <div className="card-content table-responsive">
                  <table className="table table-hover">
                    <thead className="text-warning">
                      <th>ID</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Date(Time)</th>
                    </thead>
                    <tbody>
                      {errorText || loadingImg || this.renderTableRows()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  member: PropTypes.shape({}).isRequired,
};

function select(store) {
  const { member } = store.manageTransactions;
  return {
    member,
  };
}

export default connect(select)(Main);
