// src/components/PushNotifications.js

import React, { useEffect } from 'react';
import messaging from '../firebase';

export default function PushNotifications() {
  useEffect(() => {
    // Recibe notis en primer plano
    messaging.onMessage((payload) => {
      console.log('📩 onMessage payload (compat):', payload);
      const { title, body } = payload.notification || {};
      if (title && body) {
        new Notification(title, { body });
      }
    });
  }, []);

  return null;
}
