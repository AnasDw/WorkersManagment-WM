import { useState } from 'react';
import { getRequest } from '../../../api/axiosVerbs';

const TaskEnforcerHook = (SecretParam) => {
  const [PulledUser, setPulledUser] = useState(null);
  const [Error, setError] = useState(false);
  const [WorkPlace, setWorkPlace] = useState(false);
  const [ErrorVal, setErrorVal] = useState('some thing went wrong...');

  const handleChange = (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setPulledUser(null);
      setError(false);

      getRequest(`workPlace/${SecretParam}`).then((res) => {
        setWorkPlace(res.data.data);
      });

      getRequest(`workers/getWorkerByPhoneNumber/${SecretParam}/${data.get('PhoneNumber')}`)
        .then((response) => {
          setPulledUser(response.data.data);
        })
        .catch((error) => {
          setError(true);
          setErrorVal(error.response.data.error);
        });
    } catch (error) {
      setError(true);
      setErrorVal(error.response.data.error);
    }
  };

  return [PulledUser, handleChange, Error, ErrorVal, WorkPlace];
};

export default TaskEnforcerHook;
