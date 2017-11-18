
import axios from 'axios';
import types from './types';

const BASE_URL = 'http://localhost:4000/api/transactions';

function applyFilter(filter) {
  return {
    type: types.APPLY_FILTER,
    data: filter,
  };
}

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

function getTransaction(dispatch, id, offset, filter) {
  const url = `${BASE_URL}/${id}/${offset}`;
  let axiosRequest;
  if (filter) {
    axiosRequest = axios.get(url, { params: filter });
  } else {
    axiosRequest = axios.get(url);
  }
  axiosRequest
    .then((result) => {
      dispatch(fetchTransaction(result.data));
    })
    .catch(err => console.log(err));
}

export default {
  fetchTransaction,
  applyFilter,
  getTransaction,
  currentMember,
};
