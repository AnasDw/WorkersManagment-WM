import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Iconify from '../iconify/Iconify';
import GenerateInvitationHook from './hooks/GenerateInvitationHook';

const SelectList = [{ id: 'Minutes' }, { id: 'Hours' }, { id: 'Days' }];

const GenerateInvitation = ({ boolean, WorkPlace }) => {
  const [
    Copied,
    Error,
    InputValidateType,
    InputValidateValue,
    ShortMsg,
    handleChange,
    handleSubmitForm,
    setShortMsg,
    setInputValidateValue,
  ] = GenerateInvitationHook(boolean, WorkPlace);

  return (
    <>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 9 } }}>
          <Stack direction={'row'} sx={{ gap: 1 }} alignItems="center" justifyContent="space-between">
            <Typography variant="h6" gutterBottom>
              Invitation Details
            </Typography>
            <IconButton>
              <CloseIcon
                onClick={(e) => {
                  e.preventDefault();
                  window.location.reload(true);
                }}
              />
            </IconButton>
          </Stack>
          <Stack sx={{ gap: 1, marginTop: 2 }} alignItems="center" justifyContent="space-between">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <>
                  <FormControl sx={{ m: 1, minWidth: 120 }} error={Error}>
                    <InputLabel id="demo-simple-select-helper-label">Valid For</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={InputValidateType}
                      label="Valid For"
                      onChange={handleChange}
                    >
                      {SelectList.map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.id}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Invitation Valid For</FormHelperText>
                  </FormControl>

                  <FormControl sx={{ m: 1, minWidth: 120 }} error={Error}>
                    <Select
                      onChange={(e) => {
                        setInputValidateValue(e.target.value);
                      }}
                      value={InputValidateValue}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {Array.from({ length: 20 }, (_, index) => index + 1).map((value, index) => (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Value</FormHelperText>
                  </FormControl>
                </>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={ShortMsg}
                  id="ShortMsg"
                  name="ShortMsg"
                  label="Add Short Msg"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setShortMsg(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid my={2} item xs={12} md={12}>
              <Button
                onClick={(e) => {
                  handleSubmitForm(e);
                }}
                variant="outlined"
                startIcon={
                  <Iconify icon={Copied ? 'solar:copy-outline' : 'vscode-icons:file-type-dartlang-generated'} />
                }
              >
                {Copied ? 'Copied' : 'Generate Invitation Link'}
              </Button>
            </Grid>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

GenerateInvitation.propTypes = { boolean: PropTypes.bool, WorkPlace: PropTypes.object };

export default GenerateInvitation;
