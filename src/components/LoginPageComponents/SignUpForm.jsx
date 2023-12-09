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
import IconsForm from './IconsForm';
import { Copyright, FormList } from './Styles/SignUpStyles';
import { useSignUpHook } from './hooks/SignUpHooks/SignUpHook';

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

export default function SignUp() {
  const [Errors, Error, handleSubmit] = useSignUpHook();

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
