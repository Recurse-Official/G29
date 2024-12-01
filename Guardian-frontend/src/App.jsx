import React, { useState } from 'react';
import GuardianForm from './pages/Guardianregistration';
import GuardianLogin from './pages/Guardianlogin';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [currentPage, setCurrentPage] = useState('register'); // 'register', 'login', 'dashboard'

  const goToLogin = () => setCurrentPage('login');
  const goToDashboard = () => setCurrentPage('dashboard');
  const goToRegister = () => setCurrentPage('register');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {currentPage === 'register' && <GuardianForm onRegister={goToLogin} />}
      {currentPage === 'login' && <GuardianLogin onLogin={goToDashboard} />}
      {currentPage === 'dashboard' && <Dashboard onLogout={goToRegister} />}
    </div>
  );
};

export default App;