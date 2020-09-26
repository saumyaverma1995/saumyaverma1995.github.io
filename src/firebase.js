import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDwRrJy9vu0VEcsVEGLtn5kvysn9smAKCg",
  authDomain: "blue-stacks.firebaseapp.com",
  databaseURL: "https://blue-stacks.firebaseio.com",
  projectId: "blue-stacks",
  storageBucket: "blue-stacks.appspot.com",
  messagingSenderId: "721468323160",
  appId: "1:721468323160:web:a459d168e94635cd1da12d",
  measurementId: "G-LH3TL5Y444",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
