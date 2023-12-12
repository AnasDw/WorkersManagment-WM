import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalAuthContext } from '../../../../hooks/useGlobalAuthContext';

import { validateForm } from './utils';

const useSignUpHook = () => {
  const [Errors, setErrors] = useState([]);
  const [Error, setError] = useState(false);
  const { register } = useGlobalAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    const data = new FormData(event.currentTarget);

    const result = validateForm(data.get('firstName'), data.get('lastName'), data.get('email'), data.get('password'));

    if (!result.every((value) => value === true)) {
      setErrors(result);
      setError(true);
      return false;
    }

    try {
      await register({
        name: `${data.get('firstName')} ${data.get('lastName')}`,
        email: data.get('email'),
        password: data.get('password'),
      });
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Registration failed:', error);
      setError(true);
    }

    return true;
  };

  return [Errors, Error, handleSubmit];
};

export { useSignUpHook };
