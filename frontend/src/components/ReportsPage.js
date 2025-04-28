// web/frontend/src/components/ReportsPage.js
import React, { useEffect, useState } from 'react';
import { fetchReportSummary } from '../api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function ReportsPage() {
  const [data, setData]     = useState([]);
  const [error, setError]   = useState('');

  useEffect(() => {
    const loadSummary = async () => {
      setError('');
      try {
        const { data } = await fetchReportSummary();
        setData(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      }
    };
    loadSummary();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Resumen de Tareas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="email" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completedCount" name="Completadas" />
            <Bar dataKey="pendingCount"   name="Pendientes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
