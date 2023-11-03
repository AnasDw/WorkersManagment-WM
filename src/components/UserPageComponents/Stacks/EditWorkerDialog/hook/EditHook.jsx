import { useEffect, useState } from 'react';

import { getDataFromDocByEmail, pushData } from '../../../../../config/FireBase/CRUD';

const EditHook = (data, boolean, func, WorkPlace, email) => {
  const [open, setOpen] = useState(false);
  const [Employee, setEmployee] = useState({});

  const handleClose = () => {
    setOpen(false);
    func();
  };
  const handleSave = () => {
    try {
      getDataFromDocByEmail(email, 'workers').then((res) => {
        if (res !== false) {
          const data2push = res.data.map((employee) => {
            if (employee.name === data.name) {
              employee.name = Employee.name;
              employee.PhoneNumber = Employee.PhoneNumber;
              employee.department = Employee.department;
              employee.role = Employee.role;
            }
            return employee;
          });

          pushData('workers', { data: data2push }, email).then((res) => {
            if (res !== false) {
              window.location.reload();
            }
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setEmployee(data);
    setOpen(boolean);
  }, [boolean]);

  const getWorkPlaceLists = (value) => {
    let temp = null;
    switch (value) {
      case 'Department':
        return WorkPlace.DepartmentsNames;

      case 'Main Role':
        temp = WorkPlace.Positions.find((category) => category.Dep === Employee.department);
        return temp ? temp.Pos : null;

      default:
        return null;
    }
  };
  const getEmployeeValue = (value) => {
    if (Employee) {
      switch (value) {
        case 'Employee name':
          return Employee.name || null;

        case 'Employee Phone Number':
          return Employee.PhoneNumber || null;

        case 'Department':
          return Employee.department || null;

        case 'Main Role':
          return Employee.role || null;

        default:
          return null;
      }
    } else {
      return null;
    }
  };

  const setEmployeeValue = (target, value) => {
    setEmployee((old) => {
      const employee = { ...old };
      switch (target) {
        case 'Employee name':
          employee.name = value;
          break;

        case 'Employee Phone Number':
          employee.PhoneNumber = value;
          break;

        case 'Department':
          employee.department = value;
          break;

        case 'Main Role':
          employee.role = value;
          break;

        default:
          return employee;
      }
      return employee;
    });
  };

  return [open, handleClose, handleSave, getEmployeeValue, getWorkPlaceLists, setEmployeeValue];
};

export default EditHook;
