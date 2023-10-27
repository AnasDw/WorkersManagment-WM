import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import tempUsers from 'src/_mock/user';
import { auth, db } from './index';
import { DocumentScanner } from '@mui/icons-material';

const getAllUsers = async (CallBackFunc) => {
  try {
    const UsersCollectionRef = doc(db, 'workers', 'ZaraWorkers');
    const data = await getDoc(UsersCollectionRef);
    if (data.exists()) {
      CallBackFunc(data.data().data);
      return data.data().data;
    }
  } catch (error) {
    console.error(error);
  }
};
const getUserDataByEmail = async (email) => {
  try {
    const UsersCollectionRef = doc(db, 'Users', email);
    const data = await getDoc(UsersCollectionRef);
    if (data.exists()) {
      return data.data();
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getDataFromDocByEmail = async (email, Document) => {
  try {
    const UsersCollectionRef = doc(db, Document, email);
    const data = await getDoc(UsersCollectionRef);
    if (data.exists()) {
      return data.data();
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const pushNewUser = async (user) => {
  try {
    setDoc(doc(db, 'Users', user.email), { UserName: user.name, Password: user.password });
  } catch (error) {
    console.error(error);
  }
};

const pushData = async (place, dataToPush, user) => {
  try {
    await setDoc(doc(db, place, user), dataToPush)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error(error);
  }
};

const pushAllUsers = async () => {
  try {
    setDoc(doc(db, 'workers', 'ZaraWorkers'), { data: tempUsers }).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};

export { getAllUsers, pushAllUsers, pushNewUser, getUserDataByEmail, pushData, getDataFromDocByEmail };
