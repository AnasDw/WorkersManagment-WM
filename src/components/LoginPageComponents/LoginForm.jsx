import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { LoadingButton } from '@mui/lab';
// components
import { signInWithEmailAndPassword } from 'firebase/auth';
import Iconify from '../iconify';
import { auth } from '../../config/FireBase/index';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    SignIn();
  };

  const SignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, Email, Password)
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const defaultTheme = createTheme();

  const customTheme = createTheme({
    palette: {
      ...defaultTheme.palette,
      customColor: {
        main: '#D8BE78',
        dark: '#D8BE78',
        light: '#D8BE78',
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Stack spacing={3}>
          <TextField
            color="customColor"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            label="Email address"
          />

          <TextField
            color="customColor"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox color="customColor" name="remember" label="Remember me" />
          <Link sx={{ color: '#6e6e6e' }} variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          sx={{ backgroundColor: '#3A8E93', '&:hover': { backgroundColor: '#1e6467' } }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          Login
        </LoadingButton>
      </ThemeProvider>
    </>
  );
}
