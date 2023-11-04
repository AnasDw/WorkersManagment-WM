import { useEffect, useReducer } from 'react';
import { DeleteData, getDataFromDocByEmail } from '../../../../../../../config/FireBase/CRUD';

import { ACTIONS, reducer } from '../Constants';

const AppLinkGeneratorHook = (email) => {
  const [state, dispatch] = useReducer(reducer, {
    OnlineReq: null,
    tempStored: null,
    Loading: false,
    displayGenerateInvitation: false,
    Copied: false,
    RemainingTime: null,
  });
  useEffect(() => {
    if (email != null) {
      try {
        dispatch({ type: ACTIONS.TOGGLE_LOADING_BTN });
        getDataFromDocByEmail(email, 'TaskEnforcer').then((res) => {
          if (res !== false) {
            dispatch({ type: ACTIONS.UPDATE_DATA, payload: res });
            dispatch({ type: ACTIONS.FORMAT_TIME });
            dispatch({ type: ACTIONS.TOGGLE_LOADING_BTN });
          } else {
            dispatch({ type: ACTIONS.TOGGLE_LOADING_BTN });
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [email]);

  useEffect(() => {
    if (email && !state.Loading) {
      switch (state.OnlineReq.ValidateType) {
        case 'D':
          dispatch({ type: ACTIONS.UPDATE_TIME, payload: 'Days' });
          break;
        case 'H':
          dispatch({ type: ACTIONS.UPDATE_TIME, payload: 'Hours' });
          break;
        case 'M':
          dispatch({ type: ACTIONS.UPDATE_TIME, payload: 'Minutes' });
          break;
        default:
          break;
      }

      try {
        if (state.tempStored <= 0 || state.tempStored === null) {
          if (state.OnlineReq != null) {
            DeleteData('TaskEnforcer', email).then(() => {
              dispatch({ type: ACTIONS.UPDATE_DATA, payload: false });
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    } // eslint-disable-next-line
  }, [state.tempStored]);

  return [state, dispatch];
};

export default AppLinkGeneratorHook;
