import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDataFromDocByEmail } from '../../../../config/FireBase/CRUD';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UsersReportsTable = ({ users, email }) => {
  const [Rows, setRows] = useState([]);
  const [Cols, setCols] = useState([]);

  useEffect(() => {
    setRows(() => {
      const temp = users.filter((user) => user.status === 'filled');
      let rowsToReturn = [];
      if (temp) rowsToReturn = temp.map((user) => ({ name: user.name, Requests: user.Requests }));
      return rowsToReturn;
    });
  }, [users]);

  useEffect(() => {
    try {
      getDataFromDocByEmail(email, 'Managers').then((response) => {
        const columns = response.OperatingDaysAndTimes.map((item) => item.day);
        setCols(['Name', ...columns]);
      });
    } catch (error) {
      console.error(error);
    }
  }, [email]);

  return (
    <TableContainer sx={{ marginTop: 6, p: 3, backgroundColor: 'transparent' }} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {Cols.map((col, i) => (
              <StyledTableCell key={i}>{col}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <strong> {row.name}</strong>
              </StyledTableCell>
              {row.Requests.map((request, i) => (
                <StyledTableCell key={i}>{request.req}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

UsersReportsTable.propTypes = {
  users: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired,
};

export { UsersReportsTable };