import { useState } from 'react';

import { getRequest, patchRequest } from '../../../api/axiosVerbs';
import { getCurrentDate, getCurrentTime } from '../../../constants/functions';

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
      if (boolean) SetWorkersStatus();
      const Date = getCurrentDate();
      const ShowTime = getCurrentTime();

      const encrypted = CryptoJS.AES.encrypt(`${WorkPlace.provider}`, process.env.REACT_APP_SecretKey);

      const encodedURL = encodeURIComponent(encrypted.toString());
      let URL = `https://wm-sys.netlify.app/InvitationPage/${encodedURL}`;
      let i = 0;
      const array = [...WorkPlace.invitations];
      if (boolean) {
        URL = `https://wm-sys.netlify.app/TaskEnforcerPage/${encodedURL}`;
        i = 1;
      }

      array[i] = {
        ValidateType: InputValidateType.charAt(0),
        ValidateValue: InputValidateValue,
        date: Date,
        showTime: ShowTime,
        link: URL,
      };
      await patchRequest(`workPlace/${WorkPlace.provider}`, { invitations: [...array] }).then(() => {
        navigator.clipboard.writeText(URL).then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            window.location.reload();
          }, 1000);
        });
      });
    } catch (e) {
      console.error(e);
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
    const a = SelectList.find((obj) => obj.id === InputValidateType);
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
