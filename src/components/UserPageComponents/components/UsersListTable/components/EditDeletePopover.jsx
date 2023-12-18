import React from 'react';
import PropTypes from 'prop-types';

import { Popover, MenuItem } from '@mui/material';
import Iconify from '../../../../iconify/Iconify';

const EditDeletePopover = ({ handleCloseMenu, open, setShowDialogState }) => (
  <Popover
    open={Boolean(open)}
    anchorEl={open}
    onClose={handleCloseMenu}
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    PaperProps={{
      sx: {
        p: 1,
        width: 140,
        '& .MuiMenuItem-root': {
          px: 1,
          typography: 'body2',
          borderRadius: 0.75,
        },
      },
    }}
  >
    <MenuItem
      onClick={() => {
        setShowDialogState(true, 1);
        handleCloseMenu();
      }}
    >
      <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
      Edit
    </MenuItem>

    <MenuItem
      onClick={() => {
        setShowDialogState(true, 2);
        handleCloseMenu();
      }}
      sx={{ color: 'error.main' }}
    >
      <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
      Delete
    </MenuItem>
  </Popover>
);

EditDeletePopover.propTypes = {
  open: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handleCloseMenu: PropTypes.func.isRequired,
  setShowDialogState: PropTypes.func.isRequired,
};

export default EditDeletePopover;
