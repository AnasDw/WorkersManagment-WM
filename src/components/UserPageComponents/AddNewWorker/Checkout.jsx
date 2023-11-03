import * as React from 'react';
import { useReducer, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormalDetails from './FormalDetails';
import Skills from './Skills';
import Review from './Review';
import { reducer, ACTIONS } from './constants';

import { auth } from '../../../config/FireBase';
import { AddNewWorker } from '../../../config/FireBase/CRUD';

const steps = ['Formal Details', 'Skills', 'Review your Worker'];

export default function Checkout({ PropCancelIcon }) {

  const [CancelIcon, setCancelIcon] = useState(PropCancelIcon);
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
  });

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        dispatch({ type: ACTIONS.UPDATE_EMAIL, payload: auth.currentUser.email });
      }
    });
  }, []);

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

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Stack direction="row" sx={{ gap: 1 }} alignItems="center" justifyContent="space-between">
            <Typography component="h1" variant="h4" align="center">
              New Worker SetUp
            </Typography>
            {CancelIcon ? (
              <>
                <IconButton>
                  <CloseIcon
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.reload(true);
                    }}
                  />
                </IconButton>
              </>
            ) : null}
          </Stack>

          <Stepper activeStep={state.activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {state.activeStep === steps.length ? (
            <>
              {SubmitForm()}
              <Typography variant="h5" gutterBottom>
                Nice, You successfully completed the application 👍
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(state.activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {state.activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  {state.activeStep === steps.length - 1 ? 'Save' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}
