// src/firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey:            "AIzaSyBhFaSjGT3u_qffGvTRMD59BcYAmy_yQUE",
  authDomain:        "taskteam-9a3ce.firebaseapp.com",
  projectId:         "taskteam-9a3ce",
  storageBucket:     "taskteam-9a3ce.appspot.com",
  messagingSenderId: "178596797530",
  appId:             "1:178596797530:web:bc1cdb50f969cc2b174c63",
  measurementId:     "G-DH872EBY6Y"
};

// Inicializa Firebase Compat
firebase.initializeApp(firebaseConfig);

// Exporta el objeto messaging de compat
const messaging = firebase.messaging();

export default messaging;
