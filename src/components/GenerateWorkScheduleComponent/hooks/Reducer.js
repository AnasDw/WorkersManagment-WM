const ACTIONS = {
  UPDATE_DEPARTMENT: 'update-department',
  UPDATE_DAY: 'update-day',
  UPDATE_OPENING_TIME: 'update-openingTime',
  UPDATE_CLOSING_TIME: 'update-closingTime',
  UPDATE_SHIFTS: 'update-shifts',
  UPDATE_EXPECTATIONS: 'update-expecation',
  UPDATE_MIN_DURATION: 'min-duration',
  UPDATE_MAX_DURATION: 'max-duration',
};
function Reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_DEPARTMENT:
      return { ...state, department: action.payload };
    case ACTIONS.UPDATE_DAY:
      return { ...state, day: action.payload };
    case ACTIONS.UPDATE_OPENING_TIME:
      return { ...state, openingTime: action.payload };
    case ACTIONS.UPDATE_CLOSING_TIME:
      return { ...state, closingTime: action.payload };
    case ACTIONS.UPDATE_SHIFTS:
      return { ...state, shifts: action.payload };
    case ACTIONS.UPDATE_EXPECTATIONS:
      return { ...state, expectations: action.payload };
    case ACTIONS.UPDATE_MIN_DURATION:
      return { ...state, minDuration: action.payload };
    case ACTIONS.UPDATE_MAX_DURATION:
      return { ...state, maxDuration: action.payload };

    default:
      return { ...state };
  }
}

export { ACTIONS, Reducer };
