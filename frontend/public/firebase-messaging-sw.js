// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyBhFaSjGT3u_qffGvTRMD59BcYAmy_yQUE",
  authDomain:        "taskteam-9a3ce.firebaseapp.com",
  projectId:         "taskteam-9a3ce",
  storageBucket:     "taskteam-9a3ce.appspot.com",
  messagingSenderId: "178596797530",
  appId:             "1:178596797530:web:bc1cdb50f969cc2b174c63",
  measurementId:     "G-DH872EBY6Y"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};
  if (title && body) {
    self.registration.showNotification(title, { body, icon: '/logo192.png' });
  }
});
