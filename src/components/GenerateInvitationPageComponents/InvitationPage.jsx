import { useState, useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Checkout from '../UserPageComponents/components/AddNewWorker/Checkout';
import { CryptoHook } from './hooks/CryptoHook';
import { getRequest } from '../../api/axiosVerbs';

const defaultTheme = createTheme();

const InvitationPage = () => {
  const param = useParams();
  const [WorkPlace, setWorkPlace] = useState();
  const [Loading, setLoading] = useState(true);
  const hook = CryptoHook(param.param1, 'addWorkerInvite');

  useEffect(() => {
    if (hook.SecretParam && !hook.Loading) {
      fetchRequest();
    }
    // eslint-disable-next-line
  }, [hook.SecretParam]);

  const fetchRequest = async () => {
    await getRequest(`workPlace/${hook.SecretParam}`).then((response) => {
      setWorkPlace(response.data.data);
      setLoading(false);
    });
  };

  return hook.Bool && !Loading ? (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
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
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Checkout PropCancelIcon={false} WorkPlace={WorkPlace} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : null;
};

export { InvitationPage };
