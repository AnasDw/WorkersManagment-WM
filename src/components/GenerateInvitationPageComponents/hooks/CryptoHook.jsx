import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getCurrentDate,
  getCurrentTime,
  getTimeDifferenceInHours,
  getTimeDifferenceInMinutes,
} from '../../../constants/functions';

import { getDataFromDocByEmail } from '../../../config/FireBase/CRUD';

const CryptoJS = require('crypto-js');

const CryptoHook = (data2decrypt, place) => {
  const navigate = useNavigate();
  const [Bool, setBool] = useState(true);
  const [SecretParam, setSecretParam] = useState(null);
  useEffect(() => {
    try {
      const decrypted = CryptoJS.AES.decrypt(data2decrypt.toString(), process.env.REACT_APP_SecretKey);
      const temp = decrypted.toString(CryptoJS.enc.Utf8);
      setSecretParam(temp);

      getDataFromDocByEmail(temp, place)
        .then((response) => {
          if (response !== false) {
            const currentDate = getCurrentDate();
            const currentTime = getCurrentTime();
            switch (response.ValidateType) {
              case 'M':
                if (
                  getTimeDifferenceInMinutes(currentTime, response.showTime) > response.ValidateValue ||
                  currentDate > response.Date
                ) {
                  navigate('/404', { replace: true });
                } else {
                  const a = response.ValidateValue - getTimeDifferenceInMinutes(currentTime, response.showTime);
                  setTimeout(() => {
                    setBool(false);
                    navigate('/404', { replace: true });
                  }, a * 60000);
                }
                break;
              case 'H':
                if (
                  getTimeDifferenceInHours(currentTime, response.showTime) > response.ValidateValue ||
                  currentDate > response.Date
                )
                  navigate('/404', { replace: true });
                break;
              case 'D':
                if (currentDate - response.Date > response.ValidateValue) navigate('/404', { replace: true });
                break;

              default:
                break;
            }
          } else {
            navigate('/404', { replace: true });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
      navigate('/404', { replace: true });
    }
    // eslint-disable-next-line
  }, [data2decrypt]);
  return { Bool, SecretParam };
};

export { CryptoHook };
