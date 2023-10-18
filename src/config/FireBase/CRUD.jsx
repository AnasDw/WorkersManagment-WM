import { auth, db } from './index';
import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import tempUsers from 'src/_mock/user';

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
    } else {
      return false;
    }
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

const pushAllUsers = async () => {
  try {
    setDoc(doc(db, 'workers', 'ZaraWorkers'), { data: tempUsers });
  } catch (error) {
    console.error(error);
  }
};

export { getAllUsers, pushAllUsers, pushNewUser, getUserDataByEmail };
