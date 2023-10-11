import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        WM - Workers Management
      </Link>
      {` ${new Date().getFullYear()}`}
      {'.'}
    </Typography>
  );
}
const FormList = [
  { id: 'firstName', label: 'First Name', autoComplete: 'fname', xs: 12, sm: 6 },
  { id: 'lastName', label: 'Last Name', autoComplete: 'lname', xs: 12, sm: 6 },
  { id: 'email', label: 'Email Address', autoComplete: 'email', xs: 12, sm: 12 },
  { id: 'password', label: 'Password', autoComplete: 'current-password', xs: 12, sm: 12 },
];

export { FormList, Copyright };
