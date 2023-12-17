import * as React from 'react';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WorkScheduleHook, { steps } from '../hooks/WorkScheduleHook';

const GenerateWorkSchedule = ({ WorkPlace, Users }) => {
  const [activeStep, handleBack, handleNext, handleStep, allStepsCompleted, handleReset, completed, getStepContent] =
    WorkScheduleHook(WorkPlace, Users);

  return (
    <Box
      sx={{
        backgroundColor: '#ffffffff',
        m: 1,
        mb: 5,
        borderRadius: '7px',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      }}
    >
      <Stepper sx={{ backgroundColor: '#F4F6F8' }} nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step sx={{ m: 3 }} key={label} completed={activeStep > index}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, m: 3 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ pt: 2, m: 3 }}> {getStepContent(activeStep)}</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {activeStep !== steps.length ? (
                <>
                  <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1, m: 1 }}>
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1, m: 1 }}>
                    Next
                  </Button>
                </>
              ) : null}

              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    color="error"
                    sx={{ m: 1 }}
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Close
                  </Button>
                ))}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};
GenerateWorkSchedule.propTypes = { WorkPlace: propTypes.object, Users: propTypes.array };

export default GenerateWorkSchedule;
