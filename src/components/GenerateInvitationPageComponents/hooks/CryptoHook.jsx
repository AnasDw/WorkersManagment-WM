import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getCurrentDate,
  getCurrentTime,
  getTimeDifferenceInHours,
  getTimeDifferenceInMinutes,
} from '../../../constants/functions';

import { getRequest } from '../../../api/axiosVerbs';

const CryptoJS = require('crypto-js');

const CryptoHook = (data2decrypt, place) => {
  const navigate = useNavigate();
  const [Bool, setBool] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [SecretParam, setSecretParam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decrypted = CryptoJS.AES.decrypt(data2decrypt.toString(), process.env.REACT_APP_SecretKey);
        const temp = decrypted.toString(CryptoJS.enc.Utf8);
        setSecretParam(temp);

        setLoading(true);

        const response = await getRequest(`${place}/${temp}`);
        if (response !== false) {
          handleValidation(response.data.invitation);
        } else {
          navigate('/404', { replace: true });
        }
      } catch (error) {
        console.error(error.response?.data.error);
        navigate('/404', { replace: true });
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [data2decrypt]);

  const handleValidation = (response) => {
    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();

    switch (response.validateType) {
      case 'Minutes':
        if (
          getTimeDifferenceInMinutes(currentTime, response.time) > response.validateValue ||
          currentDate > response.date
        ) {
          navigate('/404', { replace: true });
        } else {
          const a = response.validateValue - getTimeDifferenceInMinutes(currentTime, response.time);
          setTimeout(() => {
            setBool(false);
            navigate('/404', { replace: true });
          }, a * 60000);
        }
        break;
      case 'Hours':
        if (
          getTimeDifferenceInHours(currentTime, response.time) > response.validateValue ||
          currentDate > response.date
        ) {
          navigate('/404', { replace: true });
        }
        break;
      case 'Days':
        if (currentDate - response.date > response.validateValue) navigate('/404', { replace: true });
        break;
      default:
        break;
    }
    setLoading(false);
  };

  return { Bool, SecretParam, Loading };
};

export { CryptoHook };
