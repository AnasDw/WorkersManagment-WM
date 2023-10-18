import React, { useState } from 'react';

import { Stack, Button, Typography } from '@mui/material';
import Checkout from './AddNewWorker/Checkout';
import Iconify from '../iconify/Iconify';
import GenerateInvitation from './AddNewWorkerByInvitation/GenerateInvitation';
import { getAllUsers, pushAllUsers } from 'src/config/FireBase/CRUD';

const AddWorkerStack = () => {
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
                  localStorage.removeItem('FormalDetails');
                  localStorage.removeItem('WorkerSkills');
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

      {AddWorker ? <Checkout PropCancelIcon={true} /> : null}
      {GenerateInvitationBool ? <GenerateInvitation /> : null}
    </>
  );
};

export default AddWorkerStack;
