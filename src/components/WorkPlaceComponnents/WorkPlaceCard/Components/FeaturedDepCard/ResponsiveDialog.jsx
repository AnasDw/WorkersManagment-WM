import { useEffect, useState } from 'react';

// -- mui --
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

// -- FireBase --
import { pushData } from '../../../../../config/FireBase/CRUD';
import { auth } from '../../../../../config/FireBase';

export default function ResponsiveDialog({ data, boolean, func, data2push }) {
  const [open, setOpen] = useState(false);
  const [Dep, setDep] = useState({});

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
    func();
  };
  const handleSave = () => {
    try {
      data2push.Positions.map((item) => {
        if (item.Dep === data.Dep) {
          item.Dep = Dep.Dep;
          item.Pos = Dep.Pos;
        }
        return item;
      });
      pushData('Managers', data2push, auth.currentUser.email).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDep(data);
    setOpen(boolean);
  }, [boolean]);

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{open ? ` Editing ${data.Dep} Department ` : null}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This dialogue allows you to enhance and refine department names and positions to create a workplace that
            excels in every way.
          </DialogContentText>
          {open ? (
            <>
              <DialogContentText>
                <TextField
                  sx={{ margin: 4, minWidth: 470 }}
                  label="Department name"
                  value={Dep.Dep}
                  onChange={(e) => {
                    setDep((old) => {
                      const newDep = { ...old };
                      newDep.Dep = e.target.value;
                      return newDep;
                    });
                  }}
                  variant="filled"
                  color="success"
                  focused
                />
              </DialogContentText>
              <DialogContentText sx={{ margin: 3 }}>
                {Dep.Pos.map((item, index) => (
                  <TextField
                    sx={{ margin: 1 }}
                    key={index}
                    label="Position name"
                    value={item}
                    onChange={(e) => {
                      setDep((old) => {
                        const newDep = { ...old };
                        newDep.Pos[index] = e.target.value;
                        return newDep;
                      });
                    }}
                    variant="filled"
                    color="warning"
                    focused
                  />
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
