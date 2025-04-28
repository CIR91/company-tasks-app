// web/frontend/src/components/TaskList.js
import React from 'react';
import { updateTask, deleteTask } from '../api';

export default function TaskList({ tasks, onUpdated }) {
  const toggleComplete = async t => {
    await updateTask(t._id, { completed: !t.completed });
    onUpdated();
  };
  const remove = async id => {
    await deleteTask(id);
    onUpdated();
  };
  return (
    <div className="space-y-4">
      {tasks.map(t => (
        <div key={t._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <h4 className={t.completed ? 'line-through' : ''}>{t.title}</h4>
            <p className="text-sm text-gray-600">{t.description}</p>
            <p className="text-xs">Para: {new Date(t.dueDate).toLocaleDateString()}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => toggleComplete(t)} className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded">
              {t.completed ? '↺' : '✔️'}
            </button>
            <button onClick={() => remove(t._id)} className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded">🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}
