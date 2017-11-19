import React, { Component } from 'react';
import { connect } from 'react-redux';

class BodyPanel extends Component {
  renderNoTrans = () => (
    <div className="col-lg-6 col-md-12">
      <div className="card">
        <div className="card-header" data-background-color="purple">
          <h4 className="title">Transaction Detail</h4>
          <p className="category">Selected transaction details goes here</p>
        </div>
        <div className="card-content table-responsive">
          <h3>No Transaction Selected</h3>
        </div>
      </div>
    </div>
  )

  render() {
    const { transaction } = this.props;
    if (!transaction) {
      return this.renderNoTrans();
    }
    const { id, type, amount, date } = this.props.transaction;
    return (
      <div className="col-lg-6 col-md-12">
        <div className="card">
          <div className="card-header" data-background-color="purple">
            <h4 className="title">Transaction Detail</h4>
            <p className="category">Selected transaction {id.substring(0, 5)}... Type, Amount and Date</p>
          </div>
          <div className="card-content table-responsive">
            <table className="table table-hover">
              <thead className="text-warning">
                <th>Property</th>
                <th>Value</th>
              </thead>
              <tbody>
                <tr>
                  <td>Type:</td>
                  <td>{type}</td>
                </tr>
                <tr>
                  <td>Amount:</td>
                  <td>{amount}</td>
                </tr>
                <tr>
                  <td>Date(Time):</td>
                  <td>
                    {date.substring(0, 10)} ({date.substring(11, 19)})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

function select(store) {
  return {
    transaction: store.manageTransactions.transaction,
  };
}

export default connect(select)(BodyPanel);
