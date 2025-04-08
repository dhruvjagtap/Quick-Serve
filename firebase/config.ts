// firebase/config.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFz8Fq9Xp0QHYgCTs8Z6Zgsp89CKExPi8",
  authDomain: "quickserve-e2ba0.firebaseapp.com",
  projectId: "quickserve-e2ba0",
  storageBucket: "quickserve-e2ba0.appspot.com",
  messagingSenderId: "404394978475",
  appId: "1:404394978475:android:9819edb28d8e4a43581bee",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
