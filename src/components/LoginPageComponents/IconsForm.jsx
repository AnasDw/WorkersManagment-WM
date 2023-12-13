import { Stack, Button } from '@mui/material';
import React from 'react';

import { useNavigate } from 'react-router-dom';

import Iconify from '../iconify/Iconify';

const icons = [
  { name: 'eva:google-fill', color: '#D8BE78' },
  { name: 'eva:facebook-fill', color: '#D8BE78' },
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
      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };
  const SignInWithFaceBook = async () => {
    try {
      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        {icons.map((item) => (
          <Button
            onClick={() => {
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
