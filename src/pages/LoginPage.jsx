import { Helmet } from 'react-helmet-async';
import { Link, Container, Typography, Divider } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from 'src/config/FireBase';
import { LoginForm, SignUp } from 'src/components/LoginPageComponents';
// ----------------------------------------------------------------------
import { useState } from 'react';
import IconsForm from 'src/components/LoginPageComponents/IconsForm';
import { StyledContent, StyledRoot, StyledSection } from '../components/LoginPageComponents/Styles/LogInPageStyles';
import Logo from '../components/logo';
import useResponsive from '../hooks/useResponsive';
import logoBG from '/Users/anasdweik/WorkersManagment-WM-1/src/assets/WM.png';

// ----------------------------------------------------------------------

export const SignOut = async () => {
  try {
    signOut(auth, auth?.currentUser?.providerData[0].providerId)
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
};


export default function LoginPage() {
  const [ShowSignUp, setShowSignUp] = useState(false);

  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | WM </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection sx={{ backgroundColor: '#3A8E93' }}>
            <img src={logoBG} alt="login" />
          </StyledSection>
        )}

        {ShowSignUp ? (
          <>
            <Container maxWidth="sm">
              <StyledContent>
                <SignUp />
              </StyledContent>
            </Container>
          </>
        ) : (
          <>
            <Container maxWidth="sm">
              <StyledContent>
                <Typography variant="h4" gutterBottom>
                  Sign in to Workers Management - WM
                </Typography>
                <Typography variant="body2" sx={{ mb: 5, cursor: 'pointer' }}>
                  Don’t have an account? {''}
                  <Link
                    onClick={() => {
                      setShowSignUp(true);
                    }}
                    variant="subtitle2"
                    sx={{ color: '#3A8E93' }}
                  >
                    Get started
                  </Link>
                </Typography>

                <IconsForm />

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    OR  
                  </Typography>
                </Divider>
                <LoginForm />
              </StyledContent>
            </Container>
          </>
        )}
      </StyledRoot>
    </>
  );
}
