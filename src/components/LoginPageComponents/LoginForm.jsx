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

  const [Errors, setErrors] = useState([false, false]);

  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setErrors([false, false]);
    if (!Email)
      setErrors((old) => {
        const temp = [...old];
        temp[0] = 'Email is required';
        return temp;
      });
    if (!Password)
      setErrors((old) => {
        const temp = [...old];
        temp[1] = 'Password is required';
        return temp;
      });
    if (Email && Password) SignIn();
  };

  const SignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, Email, Password)
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch((e) => {
          console.log(e.code);
          let errorMessage = '';
          if (e.code === 'auth/invalid-password') errorMessage = 'Password is incorrect';
          if (e.code === 'auth/invalid-login-credentials')
            errorMessage = 'Password is Invalid, check if you have a valid login credentials';
          if (e.code === 'auth/invalid-email') errorMessage = 'Email is Invalid';
          if (e.code === 'auth/invalid-email-verified') errorMessage = 'Email is not Verified';

          setErrors((old) => {
            const temp = [...old];
            if (errorMessage.includes('Email')) temp[0] = errorMessage;
            else temp[1] = errorMessage;
            return temp;
          });

          setTimeout(() => {
            setErrors([false, false]);
          }, 10000);
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
        <Stack required spacing={3}>
          <TextField
            required
            error={Errors[0] !== false}
            helperText={Errors[0] !== false ? Errors[0] : null}
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
            error={Errors[1] !== false}
            helperText={Errors[1] !== false ? Errors[1] : null}
            name="password"
            label="Password"
            required
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
