import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="email" angle={-45} textAnchor="end" interval={0} height={80}/>
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Legend />
      <Bar dataKey="completedCount" name="Completadas" fill="#2a9d8f" />
      <Bar dataKey="pendingCount"   name="Pendientes"  fill="#e76f51" />
    </BarChart>
  </ResponsiveContainer>
);

