import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import BG from '/Users/anasdweik/WorkersManagment-WM-1/src/assets/backgrounds/pexels-kate-trifo-4057060.jpg';
import Iconify from 'src/components/iconify/Iconify';
import GenerateInvitation from 'src/components/UserPageComponents/AddNewWorkerByInvitation/GenerateInvitation';
import { useState } from 'react';

const AppLinkGeneratorTaskEnforcer = () => {
  const [Show, setShow] = useState(false);
  return (
    <Card sx={{}}>
      <CardActionArea>
        <CardMedia component="img" height="340" image={BG} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Enforcing the parameters of the task rigorously
          </Typography>
          <Typography variant="body2" color="text.secondary">
            By enforcing the task parameters rigorously, we maintain strict guidelines and ensure comprehensive
            adherence to the task's requirements. This meticulous approach fosters precision and clarity in task
            execution
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {Show ? (
          <GenerateInvitation boolean={true} />
        ) : (
          <Button
            size="small"
            sx={{ m: 1 }}
            onClick={(e) => {
              e.preventDefault();
              setShow(true);
            }}
            variant="outlined"
            startIcon={<Iconify icon="vscode-icons:file-type-dartlang-generated" />}
          >
            Generate Invitation
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default AppLinkGeneratorTaskEnforcer;
