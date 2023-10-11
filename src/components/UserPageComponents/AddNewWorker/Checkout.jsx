import * as React from 'react';
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

const steps = ['Formal Details', 'Skills', 'Review your Worker'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FormalDetails />;
    case 1:
      return <Skills />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout({ PropCancelIcon }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [CancelIcon, setCancelIcon] = React.useState(PropCancelIcon);

  CancelIcon;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const SubmitForm = () => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
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

          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              {SubmitForm()}
              <Typography variant="h5" gutterBottom>
                Nice, You successfully completed the application 👍
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}
