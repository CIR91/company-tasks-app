// web/frontend/src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { createTask, fetchUsers } from '../api';

export default function TaskForm({ onCreated }) {
  const [title, setTitle]              = useState('');
  const [description, setDescription]  = useState('');
  const [dueDate, setDueDate]          = useState('');
  const [users, setUsers]              = useState([]);
  const [assignedTo, setAssignedTo]    = useState('');

  useEffect(() => { fetchUsers().then(res => setUsers(res.data)); }, []);

  const handle = async e => {
    e.preventDefault();
    await createTask({ title, description, dueDate, assignedTo });
    setTitle('');
    setDescription('');
    setDueDate('');
    setAssignedTo('');
    onCreated();
  };

  return (
    <form onSubmit={handle} className="mb-6 bg-white p-4 rounded shadow">
      <h3 className="text-lg mb-2">Nueva Tarea</h3>
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        className="w-full mb-2 p-2 border rounded"
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <select
        className="w-full mb-2 p-2 border rounded"
        value={assignedTo}
        onChange={e => setAssignedTo(e.target.value)}
        required
      >
        <option value="">Asignar a...</option>
        {users.map(u => (
          <option key={u._id} value={u._id}>{u.name}</option>
        ))}
      </select>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Crear</button>
    </form>
  );
}
