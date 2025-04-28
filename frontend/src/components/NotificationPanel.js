// src/components/PushNotifications.js

import React, { useEffect } from 'react';
import { messaging, getToken, onMessage } from '../firebase';

export default function PushNotifications() {
  useEffect(() => {
    console.log('▶️ PushNotifications montado');
    Notification.requestPermission().then(permission => {
      console.log('🔔 Notification.permission:', permission);
      if (permission === 'granted') {
        getToken(messaging, {
          vapidKey: 'TU_VAPID_KEY_COMPLETA',
        })
        .then(currentToken => {
          console.log('🔑 Token FCM (PushNotifications):', currentToken);
        })
        .catch(err => console.error('⚠️ getToken error:', err));
      }
    });

    onMessage(messaging, payload => {
      console.log('📩 onMessage payload:', payload);
      const { title, body } = payload.notification || {};
      if (title && body) new Notification(title, { body });
    });
  }, []);

  return null;
}
