import React, { useReducer } from 'react';
import {
  GeneratingLoader,
  PositionWorkerRangeInput,
  PrepareDepartment,
  ScheduleConfigurationInput,
} from '../components/steps';
import { Reducer } from './Reducer';
import { downloadCSV } from './Functions';
import { postRequest } from '../../../api/axiosVerbs';

export const steps = ['Update Department Hours', 'Schedule Configuration', 'Update Positions Range'];
const SHIFTS = ['Morning', 'Evening'];
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
    limiter: 0,
    positionsDemand: [],
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    if (verifyStep()) {
      if (!isLastStep()) {
        const newActiveStep = activeStep + 1;
        setActiveStep(newActiveStep);
      } else {
        setActiveStep(activeStep + 1);
        handleComplete();
      }
    }
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = async () => {
    const workers = Users.filter((worker) => worker.department === state.department).map((worker) => ({
      name: worker.name,
      position: worker.position,
      requests: worker.requests,
    }));

    const array = [];

    for (let index = 0; index < state.shifts.length; ) {
      if (state.shifts[index]) {
        array.push(SHIFTS[index]);
      }
      index += 1;
    }

    await postRequest(
      `${process.env.REACT_APP_generateSchedule_path}/`,
      {
        department: state.department,
        day: state.day,
        openingTime: state.openingTime.$d.toString().split(' ')[4],
        closingTime: state.closingTime.$d.toString().split(' ')[4],
        minDuration: state.minDuration,
        maxDuration: state.maxDuration,
        limiter: state.limiter,
        shifts: array,
        positionsDemand: state.positionsDemand.filter((item) => item !== false),
        users: workers,
        provider: WorkPlace.provider,
      },
      { timeout: 60000 }
    ).then((res) => {
      if (res.data.response.message.content) downloadCSV(res.data.response.message.content, 'work_schedule.csv');
      window.location.reload();
    });
  };
  // eslint-disable-next-line
  const verifyStep = () => {
    switch (activeStep) {
      case 0:
        if (
          state.day === '' ||
          state.openingTime === null ||
          state.closingTime === null ||
          state.department === '' ||
          state.shifts.length < 1
        )
          return false;
        break;

      case 1:
        if (state.minDuration === 0 || state.maxDuration === 0) return false;
        break;

      case 2:
        return true;

      default:
        throw new Error('Unknown step');
    }
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
        return <ScheduleConfigurationInput state={state} dispatch={dispatch} Users={Users} />;
      case 2:
        return <PositionWorkerRangeInput state={state} dispatch={dispatch} WorkPlace={WorkPlace} />;
      case 3:
        return <GeneratingLoader state={state} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return [activeStep, handleBack, handleNext, handleStep, allStepsCompleted, handleReset, completed, getStepContent];
};

export default WorkScheduleHook;
