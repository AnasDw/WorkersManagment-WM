import { useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import FormalDetails from '../components/FormalDetails';
import Skills from '../components/Skills';
import Review from '../components/Review';
import { reducer, ACTIONS } from '../constants/constants';

import { auth } from '../../../../../config/FireBase';
import { AddNewWorker, getDataFromDocByEmail } from '../../../../../config/FireBase/CRUD';

const CheckOutHook = (email) => {
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
    Email: '',
    WorkPlace: {},
    Possibilities: [],
  });

  useEffect(() => {
    if (email) {
      dispatch({ type: ACTIONS.UPDATE_EMAIL, payload: email });
    } else
      onAuthStateChanged(auth, (newUser) => {
        if (newUser) {
          dispatch({ type: ACTIONS.UPDATE_EMAIL, payload: auth.currentUser.email });
        }
      });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (state.Email) {
      getDataFromDocByEmail(state.Email, 'Managers').then((res) => {
        if (res !== false) {
          dispatch({ type: ACTIONS.UPDATE_WORKPLACE, payload: res });
        }
      });
    }
  }, [state.Email]);

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

  const SubmitForm = () => {
    try {
      AddNewWorker(state.Email, {
        name: ` ${state.FirstName} ${state.LastName}`,
        department: state.Department,
        role: state.Position,
        PhoneNumber: state.PhoneNumber,
        status: 'not yet',
        Requests: null,
        skills: 'Not Found',
      }).then((res) => {
        if (res !== false) {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return [state, handleBack, SubmitForm, getStepContent, handleNext];
};

export default CheckOutHook;
