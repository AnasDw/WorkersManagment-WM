import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import Iconify from '../../../../../iconify';
import GenerateInvitation from '../../../../../GenerateInvitationPageComponents/GenerateInvitation';
import AppLinkGeneratorHook from './hooks/AppLinkGeneratorHook';

import BG from '../../../../../../assets/backgrounds/pexels-kate-trifo-4057060.jpg';
import { ACTIONS } from './Constants';

const TRUE = true;

const AppLinkGeneratorTaskEnforcer = ({ WorkPlace }) => {
  const [state, dispatch] = AppLinkGeneratorHook(WorkPlace);

  return (
    <Card>
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
        {state.displayGenerateInvitation ? (
          <GenerateInvitation boolean={TRUE} WorkPlace={WorkPlace.data.data} />
        ) : (
          <>
            <Grid container minWidth={'xl'} alignItems={'center'}>
              {state.OnlineReq && state.RemainingTime ? (
                <>
                  <Grid item>
                    <Typography variant="body2" ml={2} color="text.secondary">
                      You have active requests, Time remaining:
                      {<strong> {state.RemainingTime} </strong>}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      sx={{ m: 1 }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(state.OnlineReq.link).then(() => {
                          dispatch({ type: ACTIONS.TOGGLE_COPY_BTN });
                          setTimeout(() => {
                            dispatch({ type: ACTIONS.TOGGLE_COPY_BTN });
                          }, 1000);
                        });
                      }}
                      variant="outlined"
                      startIcon={<Iconify icon="icon-park:copy" />}
                    >
                      {!state.Copied ? 'Copy Link' : 'Copied'}
                    </Button>
                  </Grid>
                </>
              ) : null}
              <Grid item>
                <Button
                  size="small"
                  sx={{ m: 1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: ACTIONS.ADD_NEW_INVITATION });
                  }}
                  variant="outlined"
                  startIcon={<Iconify icon="vscode-icons:file-type-dartlang-generated" />}
                >
                  {state.OnlineReq ? 'Generate New Invitation' : 'Generate Invitation'}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </CardActions>
    </Card>
  );
};

AppLinkGeneratorTaskEnforcer.propTypes = {
  WorkPlace: PropTypes.object,
};

export default AppLinkGeneratorTaskEnforcer;
