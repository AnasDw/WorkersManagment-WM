import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import BG from '/Users/anasdweik/WorkersManagment-WM-1/src/assets/backgrounds/pexels-kate-trifo-4057060.jpg';
import Iconify from 'src/components/iconify/Iconify';
import GenerateInvitation from 'src/components/GenerateInvitationPageComponents/GenerateInvitation';
import { useState, useEffect, useReducer } from 'react';

import { DeleteData, getDataFromDocByEmail } from 'src/config/FireBase/CRUD';
import { getCurrentDate, getCurrentTime, getTimeDifferenceInHours, getTimeDifferenceInMinutes } from 'src/constants';
import copy from 'clipboard-copy';

const ACTIONS = {
  UPDATE_DATA: 'UPDATE_DATA',
  DELETE_DATA: 'DELETE_DATA',
  ADD_NEW_INVITATION: 'ADD_NEW_INVITATION',
  TOGGLE_COPY_BTN: 'TOGGLE_COPY_BTN',
  TOGGLE_LOADING_BTN: 'TOGGLE_COPY_BTN',
  FORMAT_TIME: 'FORMAT_TIME',
};

function reducer(state, action) {
  switch (action.type) {
    //---------------------------------------------------
    case ACTIONS.UPDATE_DATA:
      return { ...state, OnlineReq: action.payload };
    //---------------------------------------------------
    case ACTIONS.ADD_NEW_INVITATION:
      return { ...state, displayGenerateInvitation: true };
    //---------------------------------------------------
    case ACTIONS.TOGGLE_COPY_BTN:
      return { ...state, Copied: !state.Copied };
    //---------------------------------------------------
    case ACTIONS.TOGGLE_LOADING_BTN:
      return { ...state, Loading: !state.Loading };
    //---------------------------------------------------
    case ACTIONS.FORMAT_TIME:
      const currentDate = getCurrentDate();
      const currentTime = getCurrentTime();

      switch (state.OnlineReq.ValidateType) {
        case 'D':
          return {
            ...state,
            tempStored: state.OnlineReq.date - currentDate + state.OnlineReq.ValidateValue,
            RemainingTime: `${state.tempStored} Days`,
          };
        case 'H':
          return {
            ...state,
            tempStored: state.OnlineReq.ValidateValue - getTimeDifferenceInHours(currentTime, state.OnlineReq.showTime),
            RemainingTime: `${state.tempStored} Hours`,
          };
        case 'M':
          return {
            ...state,
            tempStored:
              state.OnlineReq.ValidateValue - getTimeDifferenceInMinutes(currentTime, state.OnlineReq.showTime),
            RemainingTime: `${state.tempStored} Minutes`,
          };
      }

    default:
      return state;
  }
}

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
          if (res != false) {
            dispatch({ type: ACTIONS.UPDATE_DATA, payload: res });
            dispatch({ type: ACTIONS.FORMAT_TIME });
            dispatch({ type: ACTIONS.TOGGLE_LOADING_BTN });
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [email]);

  // useEffect(() => {
  //   if (email && !state.Loading) {
  //     clg
  //     try {
  //       if (state.tempStored === 0 || state.tempStored === null) {
  //         DeleteData('TaskEnforcer', email).then((res) => {
  //           dispatch({ type: ACTIONS.UPDATE_DATA, payload: false });
  //         });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }, [state.tempStored]);

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
          <GenerateInvitation boolean={true} />
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
