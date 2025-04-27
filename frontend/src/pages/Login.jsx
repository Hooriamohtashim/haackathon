import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Store JWT token (for example, in localStorage)
      localStorage.setItem('token', response.data.token);

      // Redirect to dashboard or home
      navigate('/dashboard'); // Redirect to dashboard using navigate
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Binding input to state
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Binding input to state
          />
          <Link to="Dashboard" type="submit" className="login-button">Login</Link>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Show error message */}
        <p className="login-link-text">
          Don't have an account?{" "}
          <Link to="Signup" className="login-link">Sign Up</Link>
        </p>
      </div>

      {/* CSS inside same file */}
      <style>{`
        .login-container {
          background: #f3f4f6;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .login-title {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #374151;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          width: 300px;
          gap: 15px;
        }

        .login-input {
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .login-button {
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          background: linear-gradient(to right, #818cf8, #a78bfa);
          color: white;
          border: none;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .login-button:hover {
          opacity: 0.9;
        }

        .login-link-text {
          margin-top: 10px;
          color: #6366f1;
        }

        .login-link {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
        }

        .login-link:hover {
          text-decoration: underline;
        }

        .error-message {
          color: red;
          font-size: 0.9rem;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default Login;
