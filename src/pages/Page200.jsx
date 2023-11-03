import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import BG from '/Users/anasdweik/WorkersManagment-WM-1/src/assets/icons/4926149-removebg-preview.png';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page200() {
  return (
    <>
      <Helmet>
        <title> Request Successfully | WM </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Form submitted successfully!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Your request has been successfully received by the system. Thank you for submitting it. We'll process your
            request shortly.
          </Typography>

          <Box component="img" src={BG} sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }} />
        </StyledContent>
      </Container>
    </>
  );
}
