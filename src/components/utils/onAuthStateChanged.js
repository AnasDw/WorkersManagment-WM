import axios from 'axios';

const onAuthStateChanged = async (token) => {
  try {
    const res = await axios.get('http://localhost:3000/auth/current-user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }

  return false;
};

export default onAuthStateChanged;
