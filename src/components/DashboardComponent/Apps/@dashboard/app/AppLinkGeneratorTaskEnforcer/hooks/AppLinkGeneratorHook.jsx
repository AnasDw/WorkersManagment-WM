import { useEffect, useReducer } from 'react';

import { ACTIONS, reducer } from '../Constants';
import { getRequest } from '../../../../../../../api/axiosVerbs';

const AppLinkGeneratorHook = (WorkPlace) => {
  const [state, dispatch] = useReducer(reducer, {
    OnlineReq: {},
    tempStored: null,
    Loading: false,
    displayGenerateInvitation: false,
    Copied: false,
    RemainingTime: null,
  });
  useEffect(() => {
    if (WorkPlace?.data?.data?.provider) {
      try {
        dispatch({ type: ACTIONS.TOGGLE_LOADING_BTN });
        getRequest(`taskEnforcerInvite/${WorkPlace?.data?.data?.provider}`)
          .then((response) => {
            dispatch({ type: ACTIONS.UPDATE_DATA, payload: response.data.invitation });
            dispatch({ type: ACTIONS.FORMAT_TIME });
          })
          .catch((error) => {
            console.error(error.response?.data.error);
          })
          .finally(() => {
            dispatch({ type: ACTIONS.TOGGLE_LOADING_BTN });
          });
      } catch (error) {
        console.error(error.response?.data.error);
      }
    }
  }, [WorkPlace]);

  // eslint-disable-next-line

  return [state, dispatch];
};

export default AppLinkGeneratorHook;
