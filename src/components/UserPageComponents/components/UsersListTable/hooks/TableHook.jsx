import { useEffect, useState } from 'react';
import { useGlobalAuthContext } from '../../../../../hooks/useGlobalAuthContext';

import { applySortFilter, getComparator } from '../../../Constants/Functions';
import { getRequest } from '../../../../../api/axiosVerbs';

const TableHook = () => {
  const [open, setOpen] = useState(null);
  const [ShowDialog, setShowDialog] = useState(false);
  const [DeleteDialog, setDeleteDialog] = useState(false);
  const [Users, setUsers] = useState([]);
  const [WorkPlace, setWorkPlace] = useState();
  const [User2Edit, setUser2Edit] = useState({});
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { Manager } = useGlobalAuthContext();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const fetchUsers = async () => {
    await getRequest(`workers/${Manager.email}`).then((response) => {
      setUsers(response.data.data);
    });
  };
  const fetchWorkPlace = async () => {
    await getRequest(`workPlace/${Manager.email}`).then((response) => {
      setWorkPlace(response.data.data);
    });
  };

  useEffect(() => {
    if (Manager) {
      try {
        fetchUsers();
        fetchWorkPlace();
      } catch (error) {
        console.error(error);
      }
    }
    // eslint-disable-next-line
  }, [Manager]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Users.length) : 0;

  const filteredUsers = applySortFilter(Users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const setShowDialogState = (val, category) => {
    if (category === 1) setShowDialog(val);
    else setDeleteDialog(val);
  };
  const setUser2EditState = (val) => {
    setUser2Edit(val);
  };

  return [
    emptyRows,
    filteredUsers,
    isNotFound,
    open,
    ShowDialog,
    Users,
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
    DeleteDialog,
    setDeleteDialog,
  ];
};

export default TableHook;
