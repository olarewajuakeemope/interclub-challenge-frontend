const initialState = { tab: 'schedule', day: 1 };

function transactions(state = initialState, action) {
  if (action.type === 'FETCHED_TRANSACTION') {
    return { ...state, tab: action.data };
  }
  return state;
}

module.exports = transactions;
