import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBkY3FI9KNdzrBbcP52P_82sR5Tt9p5_t4",
  authDomain: "turnsmart-io.firebaseapp.com",
  projectId: "turnsmart-io",
  storageBucket: "turnsmart-io.appspot.com",
  messagingSenderId: "247144565486",
  appId: "1:247144565486:web:bd9eb0d56cc104a41401ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
