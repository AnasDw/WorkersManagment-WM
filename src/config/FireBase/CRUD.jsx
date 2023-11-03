import { setDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from './index';

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

const pushData = async (place, dataToPush, user) => {
  try {
    await setDoc(doc(db, place, user), dataToPush).catch((err) => {
      console.log(err);
    });
  } catch (error) {
    console.error(error);
  }
};
const DeleteData = async (place, dataToDelete) => {
  try {
    await deleteDoc(doc(db, place, dataToDelete)).catch((err) => {
      console.log(err);
    });
  } catch (error) {
    console.error(error);
  }
};

const AddNewWorker = async (place, dataToPush) => {
  try {
    await getDataFromDocByEmail(place, 'workers')
      .then((res) => {
        if (res !== false) {
          const workers = res.data;
          workers.push(dataToPush);
          pushData('workers', { data: workers }, place);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error(error);
  }
};

export { getUserDataByEmail, pushData, getDataFromDocByEmail, DeleteData, AddNewWorker };
