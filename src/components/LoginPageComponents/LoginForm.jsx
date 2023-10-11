import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
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
          navigate('/dashboard', { replace: true });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          label="Email address"
        />

        <TextField
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
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
