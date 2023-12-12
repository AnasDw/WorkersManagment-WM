import { useState } from 'react';

// @mui
import { alpha } from '@mui/material/styles';
import { Avatar, IconButton, Popover } from '@mui/material';
import { useGlobalAuthContext } from '../../../hooks/useGlobalAuthContext';

import RoleOver from './RoleOver';

// ----------------------------------------------------------------------
// eslint-disable-next-line
export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const { Manager } = useGlobalAuthContext();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {
          // eslint-disable-next-line
          <Avatar src={Manager?.photoURL} alt="photoURL" />
        }
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <RoleOver />
      </Popover>
    </>
  );
}
