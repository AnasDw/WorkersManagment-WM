import { useState } from 'react';

import { getRequest, postRequest } from '../../../api/axiosVerbs';
import { getCurrentTime, getCurrentDate } from '../../../constants/functions';

const SelectList = [{ id: 'Minutes' }, { id: 'Hours' }, { id: 'Days' }];
const CryptoJS = require('crypto-js');

const GenerateInvitationHook = (boolean, WorkPlace) => {
  const [Copied, setCopied] = useState(false);
  const [Error, setError] = useState(false);
  const [InputValidateType, setInputValidateType] = useState('None');
  const [InputValidateValue, setInputValidateValue] = useState(0);
  const [ShortMsg, setShortMsg] = useState();

  const CopyLink = async () => {
    try {
      const ShowTime = getCurrentTime();
      const currentDate = getCurrentDate();

      if (boolean) SetWorkersStatus();

      const encrypted = CryptoJS.AES.encrypt(`${WorkPlace.provider}`, process.env.REACT_APP_SecretKey);

      const encodedURL = encodeURIComponent(encrypted.toString());

      const BaseUrl =
        process.env.REACT_APP_ENV === 'development' ? 'http://localhost:3001' : 'https://wm-sys.netlify.app';

      let URL = `${BaseUrl}/InvitationPage/${encodedURL}`;

      let dataToEdit = '';

      if (boolean) {
        URL = `${BaseUrl}/TaskEnforcerPage/${encodedURL}`;
        dataToEdit = 'taskEnforcerInvite';
      } else {
        dataToEdit = 'addWorkerInvite';
      }
      await postRequest(`${dataToEdit}`, {
        provider: WorkPlace.provider,
        link: URL,
        validateType: InputValidateType,
        validateValue: InputValidateValue,
        msg: ShortMsg,
        time: ShowTime,
        date: currentDate,
      })
        .then(() => {
          navigator.clipboard.writeText(URL).then(() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
              window.location.reload();
            }, 1000);
          });
        })
        .catch((e) => {
          console.error(e.response?.data.error);
        });
    } catch (e) {
      console.error(e.response?.data.error);
    }
  };

  const SetWorkersStatus = async () => {
    try {
      await getRequest(`workers/updateWorkersStatus/${WorkPlace.provider}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setInputValidateType(event.target.value);
    SelectList.find((obj) => obj.id === InputValidateType);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    setError(false);
    if (InputValidateType !== 'None' && InputValidateValue !== 0) CopyLink();
    else setError(true);
  };

  return [
    Copied,
    Error,
    InputValidateType,
    InputValidateValue,
    ShortMsg,
    handleChange,
    handleSubmitForm,
    setShortMsg,
    setInputValidateValue,
  ];
};

export default GenerateInvitationHook;
