import {
  getCurrentTime,
  getCurrentDate,
  getTimeDifferenceInMinutes,
  getTimeDifferenceInHours,
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
function getTimeRemainingComplex(validateType, validateValue, date, time) {
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();

  const DaysDifference = date - currentDate;

  let formattedTimeRemaining = '';

  const days = validateType.toLowerCase() === 'days' ? DaysDifference + validateValue : 0;

  if (days > 0) {
    formattedTimeRemaining += `${days} days `;
  }

  if (validateType.toLowerCase() === 'hours') {
    const TimeDifference = validateValue - getTimeDifferenceInHours(currentTime, time);

    const decimalMinutes = TimeDifference * 60;
    const hours = Math.floor(decimalMinutes / 60);
    const minutes = decimalMinutes % 60;

    if (hours > 0) {
      formattedTimeRemaining += `${hours} hours `;
    }

    if (minutes > 0) {
      formattedTimeRemaining += `${minutes} minutes `;
    }
  }
  if (validateType.toLowerCase() === 'minutes') {
    const TimeDifference = validateValue - getTimeDifferenceInMinutes(currentTime, time);
    if (TimeDifference > 0) {
      formattedTimeRemaining += `${TimeDifference} minutes `;
    }
  }

  if (formattedTimeRemaining === '') {
    formattedTimeRemaining += 'less than a minute';
  }

  return formattedTimeRemaining.trim();
}

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
      return {
        ...state,
        RemainingTime: getTimeRemainingComplex(
          state.OnlineReq.validateType,
          state.OnlineReq.validateValue,
          state.OnlineReq.date,
          state.OnlineReq.time
        ),
      };

    default:
      return state;
  }
}

export { reducer, ACTIONS };
