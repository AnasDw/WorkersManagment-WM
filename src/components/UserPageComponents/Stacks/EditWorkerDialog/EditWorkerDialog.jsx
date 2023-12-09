import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditHook from './hook/EditHook';

const FORMAL_LIST = [{ label: 'Employee name' }, { label: 'Employee Phone Number' }];
const WORKPLACE_LIST = [{ label: 'Department' }, { label: 'Position' }, { label: 'Main Role' }];

export default function EditWorkerDialog({ data, boolean, func, WorkPlace }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, handleClose, handleSave, getEmployeeValue, getWorkPlaceLists, setEmployeeValue] = EditHook(
    data,
    boolean,
    func,
    WorkPlace
  );

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{open ? ` Editing ${data.name} Details ` : null}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This dialog allows you to enhance and refine employee details and skills
          </DialogContentText>
          {open ? (
            <>
              <DialogContentText textAlign={'center'} sx={{ margin: 3 }}>
                {FORMAL_LIST.map((item, index) => (
                  <TextField
                    sx={{ margin: 1, minWidth: 220 }}
                    key={index}
                    label={item.label}
                    value={getEmployeeValue(item.label)}
                    onChange={(e) => {
                      setEmployeeValue(item.label, e.target.value);
                    }}
                    color="primary"
                    focused
                  />
                ))}
                {WORKPLACE_LIST.map((item, index) => (
                  <FormControl key={index} variant="filled" sx={{ m: 1, minWidth: 220 }}>
                    <InputLabel key={index} id="demo-simple-select-filled-label">
                      {item.label}
                    </InputLabel>
                    <Select
                      key={index}
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={getEmployeeValue(item.label)}
                      onChange={(e) => {
                        setEmployeeValue(item.label, e.target.value);
                      }}
                    >
                      {getWorkPlaceLists(item.label)?.map((list, j) => (
                        <MenuItem sx={{ maxHeight: '150px', overflow: 'scroll' }} key={j} value={list}>
                          {list}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </DialogContentText>
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EditWorkerDialog.propTypes = {
  data: PropTypes.object,
  boolean: PropTypes.bool,
  func: PropTypes.func,
  WorkPlace: PropTypes.object,
  email: PropTypes.string,
};
