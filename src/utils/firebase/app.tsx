import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBKOXn8FZIToxTgwReMBeXOn_7rMfFtoZU",
  authDomain: "project-io-10.firebaseapp.com",
  projectId: "project-io-10",
  storageBucket: "project-io-10.appspot.com",
  messagingSenderId: "564248312112",
  appId: "1:564248312112:web:a0d942da3dbf537516f0f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
