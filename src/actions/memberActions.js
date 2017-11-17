
import axios from 'axios';
import types from './types';

function fetchTransaction(transactions) {
  return {
    type: types.FETCHED_TRANSACTION,
    data: transactions,
  };
}

function currentMember(member) {
  return {
    type: types.ACTIVE_MEMBER,
    data: member,
  };
}

function getTransaction(dispatch, id) {
  axios.get(`http://localhost:4000/api/transactions/${id}`)
    .then((result) => {
      dispatch(fetchTransaction(result.data));
    })
    .catch(err => console.log(err));
}

export default { fetchTransaction, getTransaction, currentMember };
