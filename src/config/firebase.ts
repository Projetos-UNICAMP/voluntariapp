import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCe1AHOGSD0Z7TEHwZsZbLeUAXClIGN5hs',
  authDomain: 'organizador-opn.firebaseapp.com',
  projectId: 'organizador-opn',
  storageBucket: 'organizador-opn.appspot.com',
  messagingSenderId: '810093379030',
  appId: '1:810093379030:web:83ef0d67ee34518cfdb877',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
