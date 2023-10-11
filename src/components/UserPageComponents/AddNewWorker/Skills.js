import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

const Departements = ['Women', 'Men', 'Kids'];
const Role = ['Manager', 'VC Designer', 'Sales Assistant', 'Casher', 'CE-NT', 'OP'];
const QuestionForm = [
  {
    question: 'In which departement the worker can be active?',
    data: Departements,
    field: 'MainDepartement',
  },
  {
    question: 'What would be the main role of the worker? ',
    data: Role,
    field: 'MainRole',
  },
];
export default function Skills() {
  // --- Reading skills from localStorage ---
  const temp = localStorage.getItem('WorkerSkills');
  const ob = JSON.parse(temp);

  const [MainDepartement, setMainDepartement] = React.useState(ob?.MainDepartement);
  const [MainRole, setMainRole] = React.useState(ob?.MainRole);

  // --- handling skills (byGeneric)  ---
  function handleFields(event, field) {
    if (field === 'MainRole') setMainRole(event);
    else setMainDepartement(event);
  }
  function ReturnValueByField(field) {
    if (field === 'MainRole') return MainRole;
    return MainDepartement;
  }

  // --- Saving skills (localStorage)  ---
  React.useEffect(() => {
    const skills = {
      'MainDepartement': MainDepartement,
      'MainRole': MainRole,
    };
    localStorage.setItem('WorkerSkills', JSON.stringify(skills));
  }, [MainDepartement, MainRole]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Grid item xs={12}>
        {QuestionForm.map((field, index) => (
          <FormControl sx={{ marginTop: 2 }} key={index}>
            <FormLabel key={index} id="demo-radio-buttons-group-label">{`${field.question}`}</FormLabel>
            <RadioGroup
              key={index}
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={ReturnValueByField(field.field)}
              onChange={(event) => {
                handleFields(event.target.value, field.field);
              }}
            >
              {field.data.map((data, j) => (
                <FormControlLabel key={j} value={`${data}`} control={<Radio />} label={`${data}`} />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
      </Grid>
    </>
  );
}
