// test-push.js
import axios from 'axios';

(async () => {
  try {
    const response = await axios.post('http://localhost:4000/api/push/group', {
      tokens: ['TU_TOKEN_1', 'TU_TOKEN_2'],
      title: '👥 Prueba Grupal',
      body: 'Este mensaje va a dos dispositivos'
    });
    console.log('Respuesta del servidor:', response.data);
  } catch (err) {
    console.error('Error al llamar al endpoint:', err.response ? err.response.data : err.message);
  }
})();
