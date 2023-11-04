import PropTypes from 'prop-types';

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
import CheckOutHook from './hooks/CheckOutHook';

const steps = ['Formal Details', 'Skills', 'Review your Worker'];

Checkout.propTypes = { PropCancelIcon: PropTypes.bool, email: PropTypes.string };

export default function Checkout({ PropCancelIcon, email }) {
  const [state, handleBack, SubmitForm, getStepContent, handleNext] = CheckOutHook(email);

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 8 } }}>
          <Stack direction="row" sx={{ gap: 1 }} alignItems="center" justifyContent="space-between">
            <Typography component="h1" variant="h4" align="center">
              {state.WorkPlace?.WorkPlaceName} - New Worker SetUp
            </Typography>
            {PropCancelIcon ? (
              <IconButton>
                <CloseIcon
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.reload(true);
                  }}
                />
              </IconButton>
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
