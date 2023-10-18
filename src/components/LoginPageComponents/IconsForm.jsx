import { Stack, Button } from '@mui/material';
import React from 'react';
import Iconify from '../iconify/Iconify';

import { auth, googleProvider, facebookProvider } from 'src/config/FireBase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getUserDataByEmail, pushNewUser } from 'src/config/FireBase/CRUD';

const icons = [
  { name: 'eva:google-fill', color: '#5a5a5a' },
  { name: 'eva:facebook-fill', color: '#1877F2' },
];

const IconsForm = () => {
  const navigate = useNavigate();

  const handleClick = async (iconType) => {
    if (iconType === 'eva:google-fill') {
      await SignInWithGoogle();
    } else {
      await SignInWithFaceBook();
    }
  };
  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((res) => {
        if (getUserDataByEmail(res.user.email)) {
          pushNewUser({
            email: res.user.email,
            password: res.user.providerId,
            name: res.user.displayName,
          }).then(() => {
            navigate('/', { replace: true });
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  const SignInWithFaceBook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider).then((res) => {
        if (getUserDataByEmail(res.user.email)) {
          pushNewUser({
            email: res.user.email,
            password: res.user.providerId,
            name: res.user.displayName,
          }).then(() => {
            navigate('/', { replace: true });
          });
        }
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
