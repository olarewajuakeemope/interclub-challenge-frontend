import types from '../actions/types';

const initialState = {
  member: {},
  transaction: {},
  transactions: {},
  filter: false,
};

function transactions(state = initialState, action) {
  if (action.type === types.FETCHED_TRANSACTION) {
    return { ...state, transactions: action.data };
  }
  if (action.type === types.ACTIVE_MEMBER) {
    return { ...state, member: action.data };
  }
  if (action.type === types.ACTIVE_TRANSACTION) {
    return { ...state, transaction: action.data };
  }
  if (action.type === types.APPLY_FILTER) {
    return { ...state, filter: action.data };
  }
  if (action.type === types.CLEAR_FILTER) {
    return { ...state, filter: false };
  }
  return state;
}

export default transactions;
