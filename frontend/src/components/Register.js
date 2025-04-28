// web/frontend/src/components/Register.js
import React, { useState, useEffect } from 'react';
// IMPORTAR jwtDecode como default, no named export
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { register }    from '../api';

export default function Register() {
  const navigate = useNavigate();
  const stored   = localStorage.getItem('token');
  const user     = stored ? jwtDecode(stored) : null;
  const isSup    = user?.role === 'supervisor';

  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [role, setRole]               = useState('employee');
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId]     = useState('');
  const [error, setError]             = useState('');

  useEffect(() => {
    if (isSup) setRole('employee');
  }, [isSup]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const payload = { name, email, password, role };
      if (role === 'supervisor' && !isSup) payload.companyName = companyName;
      if (role === 'employee'   && !isSup) payload.companyId   = companyId;

      const {
        data: { token }
      } = await register(payload);

      if (!token) return navigate('/login');
      localStorage.setItem('token', token);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-center">
          {isSup ? 'Crear Empleado' : 'Registro'}
        </h2>
        {error && <div className="text-red-500 mb-3">{error}</div>}
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Nombre completo"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Correo"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {!isSup && (
          <>
            <label className="block mb-1">Rol:</label>
            <select
              className="w-full mb-3 p-2 border rounded"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="employee">Empleado</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </>
        )}

        {role === 'supervisor' && !isSup && (
          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Nombre de la empresa"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            required
          />
        )}

        {role === 'employee' && !isSup && (
          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="ID de la empresa"
            value={companyId}
            onChange={e => setCompanyId(e.target.value)}
            required
          />
        )}

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          {isSup ? 'Crear Empleado' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}
