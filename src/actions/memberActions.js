
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
  let url = `${BASE_URL}/${id}/${offset}`;
  if (filter) {
    let filterString = '';
    const { selectType, selectDate } = filter;
    if (selectType !== 0) {
      filterString = `/${selectType}`;
    } else {
      filterString = '/type';
    }
    if (selectDate !== 0) {
      filterString += `/${selectDate}`;
    } else {
      filterString += '/date';
    }
    url += `${filterString}`;
  } else {
    url += '/type/date';
  }
  axios.get(url)
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
