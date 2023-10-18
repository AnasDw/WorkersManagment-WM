import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FireBaseApiKey,
  authDomain: process.env.REACT_APP_FireBaseAuthDomain,
  projectId: process.env.REACT_APP_FireBaseProjectId,
  storageBucket: process.env.REACT_APP_FireBaseStorageBucket,
  messagingSenderId: '671495438725',
  appId: '1:671495438725:web:797b5e1e9e38b16dd904ec',
  measurementId: 'G-KC44LQCG90',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Providers for Firebase
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const auth = getAuth(app);
export const db = getFirestore(app);
