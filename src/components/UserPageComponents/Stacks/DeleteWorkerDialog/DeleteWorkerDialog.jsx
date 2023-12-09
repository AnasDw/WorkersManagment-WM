import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { deleteRequest } from '../../../../api/axiosVerbs';

const DeleteWorkerDialog = ({ boolean, data }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const DeleteWorker = async () => {
    try {
      await deleteRequest(`workers/${data.phoneNumber}`).then((res) => {
        if (res.data.success) window.location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Dialog fullScreen={fullScreen} open={boolean} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {boolean ? ` Are you sure you want to delete ${data.name} from your database? ` : null}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              window.location.reload();
            }}
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              DeleteWorker();
            }}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteWorkerDialog;

DeleteWorkerDialog.propTypes = {
  data: PropTypes.object,
  boolean: PropTypes.bool,
};
