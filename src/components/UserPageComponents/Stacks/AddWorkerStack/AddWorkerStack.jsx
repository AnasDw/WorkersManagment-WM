import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack, Button, Typography } from '@mui/material';
import Checkout from '../../components/AddNewWorker/Checkout';
import Iconify from '../../../iconify/Iconify';
import GenerateInvitation from '../../../GenerateInvitationPageComponents/GenerateInvitation';

const AddWorkerStack = ({ WorkPlace }) => {
  const [AddWorker, setAddWorker] = useState();
  const [GenerateInvitationBool, setGenerateInvitation] = useState(false);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Workers Data-Base
        </Typography>
        {!AddWorker && !GenerateInvitationBool ? (
          <>
            <Stack direction="row" sx={{ gap: 1 }} alignItems="center" justifyContent="space-between">
              <Button
                onClick={() => {
                  setAddWorker(true);
                }}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Worker
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setGenerateInvitation(true);
                }}
                variant="outlined"
                startIcon={<Iconify icon="vscode-icons:file-type-dartlang-generated" />}
              >
                Generate Invitation
              </Button>
            </Stack>
          </>
        ) : null}
      </Stack>

      {AddWorker ? <Checkout PropCancelIcon WorkPlace={WorkPlace} /> : null}
      {GenerateInvitationBool ? <GenerateInvitation boolean={false} WorkPlace={WorkPlace} /> : null}
    </>
  );
};

AddWorkerStack.propTypes = { WorkPlace: PropTypes.object };

export default AddWorkerStack;
