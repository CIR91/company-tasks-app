// web/frontend/src/components/TasksPage.js
import React, { useState, useEffect } from 'react';
import { fetchTasks } from '../api';
import TaskForm       from './TaskForm';
import TaskList       from './TaskList';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <TaskForm onCreated={load} />
      <TaskList tasks={tasks} onUpdated={load} />
    </div>
  );
}
