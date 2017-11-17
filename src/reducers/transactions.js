import types from '../actions/types';

const initialState = { member: {}, transactions: {} };

function transactions(state = initialState, action) {
  if (action.type === types.FETCHED_TRANSACTION) {
    return { ...state, transactions: action.data };
  }
  if (action.type === types.ACTIVE_MEMBER) {
    return { ...state, member: action.data };
  }
  return state;
}

export default transactions;
