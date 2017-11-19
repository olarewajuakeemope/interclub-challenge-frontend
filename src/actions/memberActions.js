
import axios from 'axios';
import types from './types';

const BASE_URL = 'http://localhost:4000/api/transactions';

function applyFilter(filter) {
  return {
    type: types.APPLY_FILTER,
    data: filter,
  };
}

function clearFilter() {
  return {
    type: types.CLEAR_FILTER,
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

function currentTransaction(transaction) {
  return {
    type: types.ACTIVE_TRANSACTION,
    data: transaction,
  };
}

function handleAxiosError(message, type) {
  return {
    type,
    data: message,
  };
}

function getTransaction(errorType, dispatch, id, offset, filter) {
  const url = `${BASE_URL}/${id}/${offset}`;
  let axiosRequest;

  // clear existing store errors
  dispatch(handleAxiosError(false, errorType));

  if (filter) {
    axiosRequest = axios.get(url, { params: filter });
  } else {
    axiosRequest = axios.get(url);
    dispatch(clearFilter());
  }

  axiosRequest
    .then((result) => {
      dispatch(fetchTransaction(result.data));
    })
    .catch((err) => {
      const errorText = err.message === 'Request failed with status code 404' ?
        'Check your network connection' :
        err.message;
      dispatch(handleAxiosError(errorText, errorType));
    });
}

export default {
  fetchTransaction,
  applyFilter,
  getTransaction,
  currentMember,
  clearFilter,
  currentTransaction,
};
