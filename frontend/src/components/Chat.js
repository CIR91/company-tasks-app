// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

function Chat() {
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Obtener historial de chat
    axios.get('http://localhost:3000/api/chat')
      .then(response => setChatMessages(response.data))
      .catch(error => console.error('Error al obtener historial del chat:', error));

    const s = io('http://localhost:3000');
    setSocket(s);
    s.on('chatMessage', (msgData) => {
      setChatMessages(prev => [...prev, msgData]);
    });
    return () => {
      s.disconnect();
    };
  }, []);

  const sendChatMessage = () => {
    if (socket && sender && message) {
      const msgData = { sender, message };
      socket.emit('chatMessage', msgData);
      setMessage('');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
      <h3>Chat Interno</h3>
      <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
        {chatMessages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}: </strong>{msg.message}
          </div>
        ))}
      </div>
      <div style={{ marginBottom: '5px' }}>
        <input 
          type="text" 
          placeholder="Tu nombre" 
          value={sender} 
          onChange={e => setSender(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '5px' }}>
        <input 
          type="text" 
          placeholder="Mensaje" 
          value={message} 
          onChange={e => setMessage(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={sendChatMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;
