import { useState, useEffect } from 'react';
import { getDataFromDocByEmail } from '../../../config/FireBase/CRUD';

const TaskEnforcerHook = (SecretParam) => {
  const [Users, setUsers] = useState(null);
  const [PulledUser, setPulledUser] = useState(null);
  const [Boolean, setBoolean] = useState(false);
  const [UserPhoneNumber, setUserPhoneNumber] = useState();

  useEffect(() => {
    if (Users != null) {
      const userToPull = Users.find((worker) => worker.PhoneNumber === UserPhoneNumber);
      if (userToPull) setPulledUser(userToPull);
      else setBoolean(true);
    }
    // eslint-disable-next-line
  }, [UserPhoneNumber]);

  useEffect(() => {
    if (SecretParam) {
      try {
        getDataFromDocByEmail(SecretParam, 'workers').then((data) => {
          if (data !== false) {
            setUsers(data.data);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [SecretParam]);

  const handleChange = (event) => {
    try {
      setBoolean(false);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setUserPhoneNumber(data.get('PhoneNumber'));
      setPulledUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return [PulledUser, Boolean, handleChange];
};

export default TaskEnforcerHook;
