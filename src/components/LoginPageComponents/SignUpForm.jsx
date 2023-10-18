import * as React from 'react';
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
import { Copyright, FormList } from './Styles/SignUpStyles';
import IconsForm from './IconsForm';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/config/FireBase';
import { useNavigate } from 'react-router-dom';
import { pushNewUser } from 'src/config/FireBase/CRUD';

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    createUserWithEmailAndPassword(auth, data.get('email'), data.get('password'))
      .then((res) => {
        res.user.displayName = `${data.get('firstName')} ${data.get('lastName')}`;
        pushNewUser({
          email: data.get('email'),
          password: data.get('password'),
          name: `${data.get('firstName')} ${data.get('lastName')}`,
        });
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
                      key={i}
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
                  control={<Checkbox id="allowExtraEmails" value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
