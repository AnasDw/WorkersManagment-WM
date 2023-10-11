import React, { useState } from 'react';
import { auth } from 'src/config/FireBase';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import { SignOut } from 'src/pages/LoginPage';
import { MENU_OPTIONS } from './constants';

const RoleOver = () => {
  const [open, setOpen] = useState(null);

  const handleClose = () => {
    setOpen(null);
  };
  
  return (
    <>
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {auth?.currentUser?.displayName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {auth?.currentUser?.email}
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
