import './styles/App.css';
import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  const [userToken, setUserToken] = useState(null);
  const [page, setPage] = useState('login'); // 'login', 'register', or 'home'

  // Check if token in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserToken(token);
      setPage('home');
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setUserToken(token);
    setPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserToken(null);
    setPage('login');
  };

  return (
    <>
      {page === 'login' && (
        <>
          <Login onLogin={handleLogin} />
          <p>
            Don't have an account?{' '}
            <button onClick={() => setPage('register')}>Register</button>
          </p>
        </>
      )}

      {page === 'register' && (
        <>
          <Register onRegister={() => setPage('login')} />
          <p>
            Already have an account?{' '}
            <button onClick={() => setPage('login')}>Login</button>
          </p>
        </>
      )}

      {page === 'home' && <Home token={userToken} onLogout={handleLogout} />}
    </>
  );
}

export default App;
