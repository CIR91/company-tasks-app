// web/frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import NavBar      from './components/NavBar';
import Footer      from './components/Footer';
import Login       from './components/Login';
import Register    from './components/Register';
import TasksPage   from './components/TasksPage';
import ReportsPage from './components/ReportsPage';
import UploadLogo  from './components/UploadLogo';

export default function App() {
  const token = localStorage.getItem('token');
  let role = null;

  if (token) {
    try {
      const { exp, role: decodedRole } = jwtDecode(token);
      // Si el token expiró, eliminar y redirigir a login
      if (exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        role = decodedRole;
      }
    } catch {
      localStorage.removeItem('token');
    }
  }

  const isAuth = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      {isAuth && <NavBar />}
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route
              path="/login"
              element={!isAuth ? <Login /> : <Navigate to="/tasks" />}
            />
            <Route
              path="/register"
              element={
                !isAuth || role === 'supervisor'
                  ? <Register />
                  : <Navigate to="/tasks" />
              }
            />
            <Route
              path="/tasks"
              element={isAuth ? <TasksPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/reports"
              element={isAuth ? <ReportsPage /> : <Navigate to="/login" />}
            />
            {role === 'supervisor' && (
              <Route path="/logo" element={<UploadLogo />} />
            )}
            <Route
              path="*"
              element={<Navigate to={isAuth ? '/tasks' : '/login'} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
