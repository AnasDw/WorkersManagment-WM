import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../../../../hooks/useGlobalAuthContext';

export const LoginHook = () => {
  const navigate = useNavigate();

  const [Errors, setErrors] = useState([false, false]);
  const { login } = useGlobalAuthContext();

  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setErrors([false, false]);
    if (!Email)
      setErrors((old) => {
        const temp = [...old];
        temp[0] = 'Email is required';
        return temp;
      });
    if (!Password)
      setErrors((old) => {
        const temp = [...old];
        temp[1] = 'Password is required';
        return temp;
      });
    if (Email && Password) SignIn();
  };

  const SignIn = async () => {
    try {
      await login(Email, Password).then(() => {
        navigate('/dashboard/app', { replace: true });
      });
    } catch (error) {
      console.error(error.response?.data.error);
    }
  };

  return [Errors, showPassword, handleClick, setEmail, setPassword, setShowPassword];
};
