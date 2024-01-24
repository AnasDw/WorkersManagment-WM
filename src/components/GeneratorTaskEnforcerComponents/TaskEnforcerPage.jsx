import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import FormTable from './Components/FormTable';
import TaskEnforcerHook from './hooks/TaskEnforcerHook';
import { CryptoHook } from '../GenerateInvitationPageComponents/hooks/CryptoHook';

const defaultTheme = createTheme();

const TaskEnforcerPage = () => {
  const param = useParams();
  const BoolHook = CryptoHook(param.param1, 'TaskEnforcerInvite');
  const [PulledUser, handleChange, Error, ErrorVal, WorkPlace] = TaskEnforcerHook(BoolHook.SecretParam);

  return BoolHook.Bool ? (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: 'auto', minHeight: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...(PulledUser ? { marginTop: 8 } : { marginTop: 18 }),
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {!PulledUser ? <Diversity3Icon /> : <VerifiedUserIcon />}
              </Avatar>
              <Typography component="h1" variant="h5" textAlign={'center'}>
                {!PulledUser ? 'Welcome to the WM Employee System' : `Welcome back ${PulledUser?.name}`}
              </Typography>
              {!PulledUser ? (
                <Box component="form" onSubmit={handleChange} sx={{ mt: 3 }}>
                  <Grid container sx={{ width: 300 }} spacing={2}>
                    <Grid item>
                      <TextField
                        error={Error === true}
                        helperText={Error === true ? ErrorVal : null}
                        sx={{ width: 300, textAlign: 'center' }}
                        autoComplete="Phone Number"
                        name={'PhoneNumber'}
                        required
                        id={'PhoneNumber'}
                        label={'Enter Your Phone Number'}
                        autoFocus
                      />
                    </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, width: 300 }}>
                    Sign In
                  </Button>
                </Box>
              ) : (
                <FormTable WorkPlace={WorkPlace} PulledUser={PulledUser} />
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  ) : null;
};

export { TaskEnforcerPage };
