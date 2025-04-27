import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form from refreshing

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      });
      alert('Signup successful');
      // Optionally, redirect or clear the form here
    } catch (error) {
      console.error(error);
      alert('Error during signup');
    }
  };

  return (
    <>
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            className="signup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="signup-link-text">
          Already have an account?{" "}
          <Link to="/" className="signup-link">Login</Link>
        </p>
      </div>

      {/* CSS inside same file */}
      <style>{`
        .signup-container {
          background: #f5f7fa;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .signup-title {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #333;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          width: 300px;
          gap: 15px;
        }

        .signup-input {
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .signup-button {
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          background: linear-gradient(to right, #00b4db, #0083b0);
          color: white;
          border: none;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .signup-button:hover {
          opacity: 0.9;
        }

        .signup-link-text {
          margin-top: 10px;
          color: #00b4db;
        }

        .signup-link {
          color: #00b4db;
          text-decoration: none;
          font-weight: 500;
        }

        .signup-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Signup;
