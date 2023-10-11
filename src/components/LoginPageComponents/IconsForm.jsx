import { Stack, Button } from '@mui/material';
import React from 'react';
import Iconify from '../iconify/Iconify';

import { auth, googleProvider, facebookProvider } from 'src/config/FireBase';
import { signInWithPopup } from 'firebase/auth';

const icons = [
  { name: 'eva:google-fill', color: '#5a5a5a' },
  { name: 'eva:facebook-fill', color: '#1877F2' },
];

const IconsForm = () => {

  const handleClick = async (iconType) => {
    if (iconType === 'eva:google-fill') {
      await SignInWithGoogle();
    } else {
      await SignInWithFaceBook();
    }
  };
  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then(() => {
        navigate('/dashboard', { replace: true });
      });
    } catch (e) {
      console.log(e);
    }
  };
  const SignInWithFaceBook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider).then(() => {
        navigate('/dashboard', { replace: true });
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        {icons.map((item, index) => (
          <Button
            onClick={(e) => {
              handleClick(item.name);
            }}
            key={item.name}
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
          >
            <Iconify icon={`${item.name}`} color={`${item.color}`} width={22} height={22} />
          </Button>
        ))}
      </Stack>
    </>
  );
};

export default IconsForm;
