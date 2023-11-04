import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Typography, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/FireBase';
import IconsForm from './IconsForm';
import { Copyright, FormList } from './Styles/SignUpStyles';
import { pushData } from '../../config/FireBase/CRUD';

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

function validateForm(firstName, lastName, email, password) {
  const errors = [true, true, true, true];

  if (!firstName) {
    errors[0] = 'First Name is required';
  }

  if (!lastName) {
    errors[1] = 'Last Name is required';
  }

  if (!email) {
    errors[2] = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors[2] = 'Invalid email format';
  }

  if (!password) {
    errors[3] = 'Password is required';
  } else if (password.length < 6) {
    errors[3] = 'Password must be at least 6 characters long';
  } else {
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegExp.test(password)) errors[3] = 'Week password';
  }

  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function SignUp() {
  const [Errors, setErrors] = useState();
  const [Error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
    const data = new FormData(event.currentTarget);

    setErrors(validateForm(data.get('firstName'), data.get('lastName'), data.get('email'), data.get('password')));

    if (Errors !== true) {
      setError(true);
      return false;
    }

    createUserWithEmailAndPassword(auth, data.get('email'), data.get('password'))
      .then(() => {
        const displayName = `${data.get('firstName')} ${data.get('lastName')}`;
        try {
          pushData('Users', { email: data.get('email'), UserName: displayName }, auth.currentUser.email);
          navigate('/', { replace: true });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return true;
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#D8BE78' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container key={0} spacing={2}>
              {FormList.map((item, i) => (
                <>
                  <Grid key={i} item xs={item.xs} sm={item.sm}>
                    <TextField
                      color="customColor"
                      error={Error && Errors[i] !== true}
                      helperText={Error && Errors[i] !== true ? Errors[i] : null}
                      key={i}
                      type={item.id}
                      autoComplete={item.autoComplete}
                      name={item.id}
                      required
                      fullWidth
                      id={item.id}
                      label={item.label}
                      autoFocus
                    />
                  </Grid>
                </>
              ))}

              <Grid key={1} item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="customColor"
                      id="allowExtraEmails"
                      value="allowExtraEmails"
                      sx={{ color: '#D8BE78' }}
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#3A8E93', '&:hover': { backgroundColor: '#1e6467' } }}
            >
              Sign Up
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
            <IconsForm />

            <Grid container sx={{ marginTop: 2 }} justifyContent="flex-end">
              <Grid item>
                <Link
                  sx={{ color: '#3A8E93' }}
                  onClick={() => {
                    window.location.reload();
                  }}
                  href="#"
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
