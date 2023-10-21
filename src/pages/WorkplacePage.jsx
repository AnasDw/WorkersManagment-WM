import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Button, Typography, Container, Box } from '@mui/material';

import { styled } from '@mui/material/styles';

const StyledContainer = styled('div')(({ theme }) => ({
  color: 'White',
  width: '100%',
  height: '44vw',
  borderRadius: '5px',
  backgroundColor: '#ac86c395',
  display: 'flex',
  justifyContent: 'center',
}));
const StyledBox = styled('div')(({ theme }) => ({
  width: '100%',
  borderRadius: '5px',
  margin: '0rem 3rem 0rem 3rem',
  padding: '0rem 0rem 0rem 0rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const WorkplacePage = () => {
  return (
    <>
      <Helmet>
        <title> Workplace | WM </title>
      </Helmet>
      <StyledContainer sx={{ textAlign: 'center', alignItems: 'center' }}>
        <StyledBox sx={{ backgroundColor: '#fffffff0', flexDirection: 'column' }}>
          <StyledBox
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: '2rem 0rem 2rem 0rem',
              padding: '0 2rem',
            }}
          >
            <Typography variant="h4" sx={{ color: '#AC86C3', fontWeight: 'bolder' }}>
              Workplace
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <Typography variant="h7" sx={{ color: '#9a9999c3' }}>
                Already have a business?
              </Typography>
              <Typography variant="h7" sx={{ color: '#462F53' }}>
                Sign in
              </Typography>
            </Box>
          </StyledBox>
          <StyledBox>
            <Box sx={{ columnGap: '2rem' }}>
              <Typography variant="h1" sx={{ color: '#462F53', fontWeight: 'bolder' }}>
                Let's make work easier.
              </Typography>
              <Typography variant="h6" sx={{ color: '#AC86C3' }}>
                How will you be using WM - Workers Management ?
              </Typography>
            </Box>
            <StyledBox
              style={{ backgroundImage: `url(../../public/assets/line.png)`, backgroundSize: 'cover' }}
            ></StyledBox>
          </StyledBox>
        </StyledBox>
      </StyledContainer>
    </>
  );
};

export default WorkplacePage;
