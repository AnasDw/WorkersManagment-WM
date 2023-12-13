import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';

import { FillDepartments, FillPositions } from './components';

const GetStartingPage = () => {
  const [Bool, setBool] = useState(false);
  const [PositionsBool, setPositionsBool] = useState(false);
  const [DepForm, setDepForm] = useState([]);
  const [Name, setName] = useState();
  const [OBJ, setOBJ] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setBool(true);
    const data = new FormData(event.currentTarget);
    setName(data.get('name'));
  };

  useEffect(() => {
    if (DepForm.length >= 1 && Bool) {
      const obj = {
        WorkPlaceName: Name,
        DepartmentsNames: DepForm,
      };
      setOBJ(obj);
      setPositionsBool(true);
    } else {
      setBool(false);
    }
    // eslint-disable-next-line
  }, [DepForm]);

  const handleData = (newData) => {
    setDepForm(newData);
  };

  return (
    <Grid maxWidth={'xl'} container justifyContent={'center'} textAlign={'center'}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} square>
        <Box
          sx={{
            my: 8,
            mx: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CloseIcon
            onClick={() => {
              window.location.reload();
            }}
            sx={{ right: '7vw', position: 'absolute', cursor: 'pointer' }}
          />

          <Avatar sx={{ m: 1, bgcolor: '#1CB7A6' }}>
            <PostAddIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            New Workplace Set Up
          </Typography>

          {!PositionsBool ? (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="WorkPlace Name"
                name="name"
                autoFocus
                xs={12}
                sm={12}
                md={12}
              />

              <FillDepartments Bool={Bool} handleData={handleData} />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#F1BC8D',
                  '&:hover': {
                    backgroundColor: '#1CB7A6',
                    transition: '1s',
                  },
                }}
              >
                Next
              </Button>
            </Box>
          ) : (
            <FillPositions data={OBJ} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default GetStartingPage;
