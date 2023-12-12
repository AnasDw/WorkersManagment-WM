import { getRequest } from '../../api/axiosVerbs';

const onAuthStateChanged = async () => {
  try {
    const res = await getRequest('auth/current-user');
    return res;
  } catch (error) {
    console.error(error.message);
  }

  return false;
};

export default onAuthStateChanged;
