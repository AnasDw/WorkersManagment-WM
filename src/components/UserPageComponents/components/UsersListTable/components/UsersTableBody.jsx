import React from 'react';
import { sentenceCase } from 'change-case';
import PropTypes from 'prop-types';

import { Stack, Avatar, Checkbox, TableRow, TableBody, TableCell, Typography, IconButton } from '@mui/material';
import Label from '../../../../label';
import Iconify from '../../../../iconify';

const UsersTableBody = ({
  setUser2EditState,
  handleClick,
  emptyRows,
  page,
  rowsPerPage,
  filteredUsers,
  selected,
  Users,
  handleOpenMenu,
}) => {
  const getAvatarByCounter = (name, j) => {
    const Counter = j < Users.length ? j : Users.length % j;
    return <Avatar alt={name} src={`/assets/images/avatars/avatar_${Counter}.jpg`} />;
  };

  return (
    <TableBody>
      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, j) => {
        const { name, phoneNumber, department, position, role, status } = row;
        const selectedUser = selected.indexOf(name) !== -1;
        return (
          <TableRow hover key={j} tabIndex={-1} role="checkbox" selected={selectedUser}>
            <TableCell padding="checkbox">
              <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
            </TableCell>

            <TableCell component="th" scope="row" padding="none">
              <Stack direction="row" alignItems="center" spacing={2}>
                {getAvatarByCounter(name, page * 5 + j)}
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </Stack>
            </TableCell>

            <TableCell align="left">{`0${phoneNumber}`}</TableCell>

            <TableCell align="left">{department}</TableCell>

            <TableCell align="left">{position}</TableCell>

            <TableCell align="left">{role}</TableCell>

            <TableCell align="left">
              <Label color={(status === 'Incomplete' && 'error') || 'success'}>{sentenceCase(status)}</Label>
            </TableCell>

            <TableCell align="right">
              <IconButton
                size="large"
                color="inherit"
                onClick={(e) => {
                  setUser2EditState(row);
                  handleOpenMenu(e);
                }}
              >
                <Iconify icon={'eva:more-vertical-fill'} />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

UsersTableBody.propTypes = {
  filteredUsers: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  Users: PropTypes.array.isRequired,
  setUser2EditState: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  emptyRows: PropTypes.number.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
};

export default UsersTableBody;
