// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { LoginHook } from './hooks/LoginHooks/LoginHook';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const [Errors, showPassword, handleClick, setEmail, setPassword, setShowPassword] = LoginHook();

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
