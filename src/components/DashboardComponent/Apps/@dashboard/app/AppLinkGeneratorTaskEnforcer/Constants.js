import {
  getCurrentDate,
  getCurrentTime,
  getTimeDifferenceInHours,
  getTimeDifferenceInMinutes,
} from '../../../../../../constants';

const ACTIONS = {
  UPDATE_DATA: 'UPDATE_DATA',
  DELETE_DATA: 'DELETE_DATA',
  ADD_NEW_INVITATION: 'ADD_NEW_INVITATION',
  TOGGLE_COPY_BTN: 'TOGGLE_COPY_BTN',
  TOGGLE_LOADING_BTN: 'TOGGLE_COPY_BTN',
  FORMAT_TIME: 'FORMAT_TIME',
  UPDATE_TIME: 'UPDATE_TIME',
};

const currentDate = getCurrentDate();
const currentTime = getCurrentTime();

function reducer(state, action) {
  switch (action.type) {
    //---------------------------------------------------
    case ACTIONS.UPDATE_DATA:
      return { ...state, OnlineReq: action.payload };
    //---------------------------------------------------
    case ACTIONS.UPDATE_TIME:
      return { ...state, RemainingTime: `${state.tempStored} ${action.payload}` };
    //---------------------------------------------------
    case ACTIONS.ADD_NEW_INVITATION:
      return { ...state, displayGenerateInvitation: true };
    //---------------------------------------------------
    case ACTIONS.TOGGLE_COPY_BTN:
      return { ...state, Copied: !state.Copied };
    //---------------------------------------------------
    case ACTIONS.TOGGLE_LOADING_BTN:
      return { ...state, Loading: !state.Loading };
    //---------------------------------------------------
    case ACTIONS.FORMAT_TIME:
      switch (state.OnlineReq.ValidateType) {
        case 'D':
          return {
            ...state,
            tempStored: state.OnlineReq.date - currentDate + state.OnlineReq.ValidateValue,
          };
        case 'H':
          return {
            ...state,
            tempStored: state.OnlineReq.ValidateValue - getTimeDifferenceInHours(currentTime, state.OnlineReq.showTime),
          };
        case 'M':
          return {
            ...state,
            tempStored:
              state.OnlineReq.ValidateValue - getTimeDifferenceInMinutes(currentTime, state.OnlineReq.showTime),
          };
        default:
          return state;
      }

    default:
      return state;
  }
}

export { reducer, ACTIONS };
