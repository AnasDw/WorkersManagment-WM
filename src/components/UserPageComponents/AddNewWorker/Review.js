import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function Review() {
  const temp = localStorage.getItem('FormalDetails');
  const temp2 = localStorage.getItem('WorkerSkills');

  const FormalDetails = JSON.parse(temp);
  const WorkerSkills = JSON.parse(temp2);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Form summary
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Formal Detail
            </Typography>
            <Typography gutterBottom>
              {' '}
              <strong>Name: </strong>
              {`${FormalDetails?.FirstName} ${FormalDetails?.LastName}`}
            </Typography>
            <Typography gutterBottom>
              {' '}
              <strong>PhoneNumber: </strong>
              {`${FormalDetails?.PhoneNumber}`}
            </Typography>
            <Typography gutterBottom>
              <strong> Gender:</strong>
              {`${FormalDetails?.Gender}`}
            </Typography>
            <Typography gutterBottom>
              {FormalDetails?.Gender ? 'Young' : null}
            </Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Skills
            </Typography>
            <Grid container direction="column">
              <fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {' '}
                    <strong>Main Department: </strong> {WorkerSkills?.MainDepartement}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {' '}
                    <strong> Main Role: </strong> {WorkerSkills?.MainRole}
                  </Typography>
                </Grid>
              </fragment>
            </Grid>
          </Grid>
        </Grid>
      </Typography>
    </>
  );
}
