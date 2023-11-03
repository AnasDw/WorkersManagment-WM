import { Helmet } from 'react-helmet-async';

// @mui
import { Card, Table, Container, TableContainer, TablePagination } from '@mui/material';

// components
import Scrollbar from '../components/scrollbar';
import {
  AddWorkerStack,
  EditDeletePopover,
  EditWorkerDialog,
  NoResultsMessage,
  UsersTableBody,
} from '../components/UserPageComponents';

// sections

import { UserListHead, UserListToolbar } from '../components/UserPageComponents/Apps/user';
import TableHook from '../components/UserPageComponents/UsersListTable/hooks/TableHook';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'PhoneNumber', label: 'Phone Number', alignRight: false },
  { id: 'department', label: 'Department', alignRight: false },
  { id: 'role', label: 'Main Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: ' ', label: ' ', alignRight: false },
];

const TRUE = true;
// ----------------------------------------------------------------------

export default function UserPage() {
  const [
    emptyRows,
    filteredUsers,
    isNotFound,
    open,
    ShowDialog,
    Users,
    Email,
    WorkPlace,
    User2Edit,
    page,
    order,
    selected,
    orderBy,
    filterName,
    rowsPerPage,
    handleOpenMenu,
    handleCloseMenu,
    handleRequestSort,
    handleSelectAllClick,
    handleChangePage,
    handleClick,
    handleFilterByName,
    handleChangeRowsPerPage,
    setShowDialogState,
    setUser2EditState,
  ] = TableHook();

  return (
    <>
      <Helmet>
        <title> WorkersBase | WM </title>
      </Helmet>

      <Container>
      
        <AddWorkerStack />

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            setUser2EditState={setUser2EditState}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={Users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  handleOpenMenu={handleOpenMenu}
                />

                <UsersTableBody
                  setUser2EditState={setUser2EditState}
                  handleClick={handleClick}
                  emptyRows={emptyRows}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  filteredUsers={filteredUsers}
                  selected={selected}
                  Users={Users}
                  handleOpenMenu={handleOpenMenu}
                />

                <NoResultsMessage isNotFound={isNotFound} filterName={filterName} />
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <EditDeletePopover handleCloseMenu={handleCloseMenu} open={open} setShowDialogState={setShowDialogState} />

      {!ShowDialog ? null : (
        <EditWorkerDialog
          data={User2Edit}
          boolean={TRUE}
          func={() => {
            setShowDialogState(false);
          }}
          WorkPlace={WorkPlace}
          email={Email}
        />
      )}
    </>
  );
}
