// web/frontend/src/components/NavBar.js
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchCompany } from '../api';

export default function NavBar() {
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompany().then(res => setCompany(res.data));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <NavLink to="/tasks" className="text-2xl font-bold text-blue-600">
            TaskApp
          </NavLink>
          <NavLink to="/tasks" className="hover:text-blue-500">Tareas</NavLink>
          <NavLink to="/reports" className="hover:text-blue-500">Reportes</NavLink>
          {company?.logo && (
            <img
              src={company.logo}
              alt="Logo"
              className="h-8 w-8 rounded object-contain"
            />
          )}
        </div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
