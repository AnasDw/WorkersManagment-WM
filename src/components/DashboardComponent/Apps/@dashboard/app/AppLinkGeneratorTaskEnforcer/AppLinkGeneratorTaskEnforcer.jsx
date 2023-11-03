import * as React from 'react';
import { useEffect, useReducer } from 'react';
import copy from 'clipboard-copy';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import Iconify from '../../../../../iconify';
import GenerateInvitation from '../../../../../GenerateInvitationPageComponents/GenerateInvitation';

import { DeleteData, getDataFromDocByEmail } from '../../../../../../config/FireBase/CRUD';

import BG from '../../../../../../assets/backgrounds/pexels-kate-trifo-4057060.jpg';
import { ACTIONS, reducer } from './Constants';

const TRUE = true;

const AppLinkGeneratorTaskEnforcer = ({ email }) => {
  const [state, dispatch] = useReducer(reducer, {
    OnlineReq: null,
    tempStored: null,
    Loading: false,
    displayGenerateInvitation: false,
    Copied: false,
    RemainingTime: null,
  });

  useEffect(() => {
    if (email != null) {
      try {
        dispatch({ type: ACTIONS.TOGGLE_LOADING_BTN });
        getDataFromDocByEmail(email, 'TaskEnforcer').then((res) => {
          if (res !== false) {
            dispatch({ type: ACTIONS.UPDATE_DATA, payload: res });
            dispatch({ type: ACTIONS.FORMAT_TIME });
            dispatch({ type: ACTIONS.TOGGLE_LOADING_BTN });
          } else {
            dispatch({ type: ACTIONS.TOGGLE_LOADING_BTN });
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [email]);

  useEffect(() => {
    if (email && !state.Loading) {
      switch (state.OnlineReq.ValidateType) {
        case 'D':
          dispatch({ type: ACTIONS.UPDATE_TIME, payload: 'Days' });
          break;
        case 'H':
          dispatch({ type: ACTIONS.UPDATE_TIME, payload: 'Hours' });
          break;
        case 'M':
          dispatch({ type: ACTIONS.UPDATE_TIME, payload: 'Minutes' });
          break;
        default:
          break;
      }

      try {
        if (state.tempStored <= 0 || state.tempStored === null) {
          if (state.OnlineReq != null) {
            DeleteData('TaskEnforcer', email).then(() => {
              dispatch({ type: ACTIONS.UPDATE_DATA, payload: false });
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [state.tempStored]);

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
          <GenerateInvitation boolean={TRUE} />
        ) : (
          <>
            {state.OnlineReq ? (
              <>
                <Typography variant="body2" ml={2} color="text.secondary">
                  You have active requests, Time remaining:
                  {<strong> {state.RemainingTime} </strong>}
                </Typography>
                <Button
                  size="small"
                  sx={{ m: 1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    copy(state.OnlineReq.link).then(() => {
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
              </>
            ) : null}
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
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default AppLinkGeneratorTaskEnforcer;
