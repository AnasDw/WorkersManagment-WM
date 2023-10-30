import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import BG from '/Users/anasdweik/WorkersManagment-WM-1/src/assets/backgrounds/pexels-kate-trifo-4057060.jpg';
import Iconify from 'src/components/iconify/Iconify';
import GenerateInvitation from 'src/components/GenerateInvitationPageComponents/GenerateInvitation';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDataFromDocByEmail } from 'src/config/FireBase/CRUD';
import { getCurrentDate } from 'src/constants';
import copy from 'clipboard-copy';

const AppLinkGeneratorTaskEnforcer = ({ email }) => {
  const [Show, setShow] = useState(false);
  const [Copied, setCopied] = useState(false);
  const [OnlineReq, setOnlineReq] = useState(null);
  const [RemainingTime, setRemainingTime] = useState();

  useEffect(() => {
    try {
      if (email != null) {
        getDataFromDocByEmail(email, 'TaskEnforcer').then((res) => {
          if (res != false) {
            setOnlineReq(res);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [email]);

  useEffect(() => {
    if (OnlineReq) formatTime();
  }, [OnlineReq]);

  const formatTime = () => {
    const currentDate = getCurrentDate();

    if (OnlineReq.ValidateType === 'D') {
      const temp = OnlineReq.date - currentDate + OnlineReq.ValidateValue;
      setRemainingTime(`${temp} Days`);
    }
  };

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
          <>
            {OnlineReq ? (
              <>
                <Typography variant="body2" ml={2} color="text.secondary">
                  You have active requests, Time remaining: {<strong> {RemainingTime} </strong>}
                </Typography>
                <Button
                  size="small"
                  sx={{ m: 1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    copy(OnlineReq.link).then(() => {
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 1000);
                    });
                  }}
                  variant="outlined"
                  startIcon={<Iconify icon="icon-park:copy" />}
                >
                  {!Copied ? 'Copy Link' : 'Copied'}
                </Button>
              </>
            ) : null}
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
              {OnlineReq ? 'Generate New Invitation' : 'Generate Invitation'}
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default AppLinkGeneratorTaskEnforcer;
