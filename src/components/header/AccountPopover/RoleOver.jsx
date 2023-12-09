import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import axios from 'axios';

import { MENU_OPTIONS } from './constants';

const RoleOver = ({ param }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [open, setOpen] = useState(null);

  const handleClose = () => {
    setOpen(null);
  };

  const SignOut = async () => {
    try {
      await axios
        .get('http://localhost:3000/auth/logout', {
          headers: {
            Authorization: `Bearer ${document.cookie.split('=')[1]}`,
          },
          withCredentials: true,
        })
        .then(navigate('/login', { replace: true }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {param?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {param?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ p: 1 }}>
        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <MenuItem
        onClick={() => {
          SignOut();
        }}
        sx={{ m: 1 }}
      >
        Logout
      </MenuItem>
    </>
  );
};

export default RoleOver;
