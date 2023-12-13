import React, { useReducer } from 'react';
import { PositionWorkerRangeInput, PrepareDepartment, ScheduleConfigurationInput } from '../components/steps';
import { Reducer } from './Reducer';

export const steps = ['Update Department Hours', 'Schedule Configuration', 'Update Positions Range'];

const WorkScheduleHook = (WorkPlace, Users) => {
  const [state, dispatch] = useReducer(Reducer, {
    WorkPlace: { ...WorkPlace },
    department: '',
    day: '',
    openingTime: null,
    closingTime: null,
    shifts: [true, false],
    expectations: [false, false],
    minDuration: 0,
    maxDuration: 0,
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    if (verifyStep()) {
      const newActiveStep = isLastStep() ? handleComplete : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const verifyStep = () => {
    // switch (activeStep) {
    //   case 0:
    //     if (
    //       state.day === '' ||
    //       state.openingTime === null ||
    //       state.closingTime === null ||
    //       state.department === '' ||
    //       state.shifts.length < 1
    //     )
    //       return false;
    //     break;
    //   case 1:
    //     if (state.minDuration === 0 || state.maxDuration === 0) return false;
    //     break;
    //   default:
    //     throw new Error('Unknown step');
    // }
    return true;
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PrepareDepartment state={state} dispatch={dispatch} WorkPlace={WorkPlace} />;
      case 1:
        return <PositionWorkerRangeInput state={state} dispatch={dispatch} WorkPlace={WorkPlace} Users={Users} />;
      case 2:
        return <ScheduleConfigurationInput />;
      default:
        throw new Error('Unknown step');
    }
  }

  return [activeStep, handleBack, handleNext, handleStep, allStepsCompleted, handleReset, completed, getStepContent];
};

export default WorkScheduleHook;
