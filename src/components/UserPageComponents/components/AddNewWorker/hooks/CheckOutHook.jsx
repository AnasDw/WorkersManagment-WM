import { useReducer } from 'react';

import FormalDetails from '../components/FormalDetails';
import Skills from '../components/Skills';
import Review from '../components/Review';
import { reducer, ACTIONS } from '../constants/constants';
import { postRequest } from '../../../../../api/axiosVerbs';

const CheckOutHook = (PropCancelIcon, WorkPlace) => {
  const [state, dispatch] = useReducer(reducer, {
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Gender: '',
    Under18: false,
    Department: '',
    Position: '',
    activeStep: 0,
    error: false,
    WorkPlace: { ...WorkPlace },
    Possibilities: [],
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FormalDetails state={state} dispatch={dispatch} />;
      case 1:
        return <Skills state={state} dispatch={dispatch} />;
      case 2:
        return <Review state={state} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    dispatch({ type: ACTIONS.VALIDATE });
  };

  const handleBack = () => {
    dispatch({ type: ACTIONS.DECREES });
  };

  const SubmitForm = async () => {
    const URL = PropCancelIcon ? 'workers' : 'addWorkerLimitedInvite';
    try {
      await postRequest(URL, {
        provider: WorkPlace.provider,
        name: `${state.FirstName} ${state.LastName}`,
        department: state.Department,
        position: state.Position,
        phoneNumber: state.PhoneNumber,
      }).then((res) => {
        if (res) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error.response?.data.error);
    }
  };

  return [state, handleBack, SubmitForm, getStepContent, handleNext];
};

export default CheckOutHook;
