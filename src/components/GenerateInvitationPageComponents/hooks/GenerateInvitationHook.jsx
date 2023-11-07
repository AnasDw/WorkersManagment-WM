import { useState } from 'react';
import copy from 'clipboard-copy';

import { getCurrentDate, getCurrentTime } from '../../../constants/functions';
import { auth } from '../../../config/FireBase';
import { getDataFromDocByEmail, pushData } from '../../../config/FireBase/CRUD';

const SelectList = [{ id: 'Minutes' }, { id: 'Hours' }, { id: 'Days' }];
const CryptoJS = require('crypto-js');

const GenerateInvitationHook = (boolean) => {
  const [Copied, setCopied] = useState(false);
  const [Error, setError] = useState(false);
  const [InputValidateType, setInputValidateType] = useState('None');
  const [InputValidateValue, setInputValidateValue] = useState(0);
  const [ShortMsg, setShortMsg] = useState();
  // eslint-disable-next-line
  const [temp, setTemp] = useState({});

  const CopyLink = async () => {
    try {
      if (boolean) SetWorkersStatus();
      const Date = getCurrentDate();
      const ShowTime = getCurrentTime();

      const encrypted = CryptoJS.AES.encrypt(`${auth.currentUser.email}`, process.env.REACT_APP_SecretKey);

      const encodedURL = encodeURIComponent(encrypted.toString());
      let URL = `https://wm-sys.netlify.app/InvitationPage/${encodedURL}`;
      let place = 'AddUserInvitation';
      if (boolean) {
        URL = `https://wm-sys.netlify.app/TaskEnforcerPage/${encodedURL}`;
        place = 'TaskEnforcer';
      }

      await pushData(
        place,
        {
          ValidateType: InputValidateType.charAt(0),
          ValidateValue: InputValidateValue,
          date: Date,
          showTime: ShowTime,
          link: URL,
        },
        auth.currentUser.email
      ).then(() => {
        copy(URL).then(() => {
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
      await getDataFromDocByEmail(auth.currentUser.email, 'workers').then((res) => {
        if (res !== false) {
          const Data2Push = res.data.map((data) => {
            const temp = { ...data };
            temp.status = 'not yet';
            temp.Requests = null;
            return temp;
          });
          pushData('workers', { data: Data2Push }, auth.currentUser.email);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setInputValidateType(event.target.value);
    const a = SelectList.find((obj) => obj.id === InputValidateType);
    setTemp(a);
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
