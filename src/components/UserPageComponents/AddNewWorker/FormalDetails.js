import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

export default function FormalDetails() {
  const temp = localStorage.getItem("FormalDetails");
  const ob = JSON.parse(temp);
  const [FName, setFName] = React.useState(ob?.FirstName);
  const [LName, setLName] = React.useState(ob?.LastName);
  const [Phone, setPhone] = React.useState(ob?.PhoneNumber);
  const [Gender, setGender] = React.useState(ob?.Gender);
  const [IsUnder18, setIsUnder18] = React.useState(ob?.IsUnder18);

  React.useEffect(() => {
    const FormalDetails = {
      FirstName: FName,
      LastName: LName,
      PhoneNumber: Phone,
      "Gender": Gender,
      "IsUnder18": IsUnder18
    };
    localStorage.setItem('FormalDetails', JSON.stringify(FormalDetails));
  }, [FName, LName, Phone,Gender, IsUnder18]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Formal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={FName}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => {
              setFName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={LName}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => {
              setLName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={Phone}
            id="phoneNumber"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={Gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            checked={IsUnder18}
            onChange={(e) => {
              setIsUnder18(e.target.checked);
            }}
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Is the worker under the age of 18?"
          />
        </Grid>
      </Grid>
    </>
  );
}
