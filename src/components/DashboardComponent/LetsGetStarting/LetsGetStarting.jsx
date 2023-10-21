import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import Stack from '@mui/material/Stack';

// ----------------------------------------------------------------------

import { auth } from 'src/config/FireBase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserDataByEmail } from 'src/config/FireBase/CRUD';
import { useEffect, useState } from 'react';

const LetsGetStarting = () => {
  const [SignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        getUserDataByEmail(auth.currentUser.email).then((res) => {
          if (res) {
            auth.currentUser.displayName = res.UserName;
            setSignedIn(true);
          }
        });
      } else {
        setSignedIn(false);
      }
    });
  }, []);
  return (
    <>
      <Helmet>
        <title> LetsGetStarting | WM </title>
      </Helmet>
    </>
  );
};

export default LetsGetStarting;
