const types = require('./types');

function dispatchTransactions(result) {
  dispatch => dispatch({
    type: types.FETCHED_TRANSACTION,
    data: result,
  });
}

export default function fetchTransaction(transactions) {
  return {
    type: types.FETCHED_TRANSACTION,
    data: transactions,
  };
}
