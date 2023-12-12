import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import { useGlobalAuthContext } from '../../../hooks/useGlobalAuthContext';

import { MENU_OPTIONS } from './constants';

const RoleOver = () => {
  const navigate = useNavigate();
  const { Manager, logout } = useGlobalAuthContext();

  // eslint-disable-next-line

  const SignOut = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {Manager?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {Manager?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ p: 1 }}>
        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label}>{option.label}</MenuItem>
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
