// firebase/config.ts

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBFz8Fq9Xp0QHYgCTs8Z6Zgsp89CKExPi8",
  authDomain: "quickserve-e2ba0.firebaseapp.com",
  projectId: "quickserve-e2ba0",
  storageBucket: "quickserve-e2ba0.appspot.com",
  messagingSenderId: "404394978475",
  appId: "1:404394978475:android:9819edb28d8e4a43581bee",
};

// const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// const db = getFirestore(app);

export { auth, firestore, storage };
