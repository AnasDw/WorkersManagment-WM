import { useEffect, useState } from 'react';
import { patchRequest } from '../../../../../api/axiosVerbs';

const EditHook = (data, boolean, func, WorkPlace) => {
  const [open, setOpen] = useState(false);
  const [Employee, setEmployee] = useState({});

  const handleClose = () => {
    setOpen(false);
    func();
  };
  const handleSave = async () => {
    try {
      await patchRequest(`workers/${data.phoneNumber}`, {
        name: Employee.name,
        phoneNumber: Employee.phoneNumber,
        role: Employee.role,
        position: Employee.position,
        department: Employee.department,
      }).then(window.location.reload());
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setEmployee(data);
    setOpen(boolean);
    // eslint-disable-next-line
  }, [boolean]);

  const getWorkPlaceLists = (value) => {
    let temp = null;
    switch (value) {
      case 'Department':
        return WorkPlace.departmentsNames;
      case 'Main Role':
        return ['user', 'publisher'];

      case 'Position':
        temp = WorkPlace.positions.find((category) => category.Dep === Employee.department);
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
          return Employee.phoneNumber || null;

        case 'Department':
          return Employee.department || null;

        case 'Main Role':
          return Employee.role || null;

        case 'Position':
          return Employee.position || null;

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
          employee.phoneNumber = value;
          break;

        case 'Department':
          employee.department = value;
          break;

        case 'Position':
          employee.position = value;
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
