import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (email === 'anushka@example.com' && username === 'anushka' && password === 'anushka123') {
      alert('Login Successful!');
      // Redirect to a different page, e.g., using React Router
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Here you would typically send the signup data to the server for registration
    alert('Signup Successful!');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setIsSignup(false); // Switch back to the login form after signup
  };

  return (
    <div>
      <h2 className="toggle-form">{isSignup ? 'Signup Page' : 'Login Page'}</h2>
      <div className="login-container">

        <form
          onSubmit={isSignup ? handleSubmitSignup : handleSubmitLogin}
          className="login-form"
        >

          <div className="form-group">
            <label htmlFor="usernamez">Name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
          </div>

          {isSignup && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm password"
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
        </form>
      </div>
      <div className="toggle-form">
        <span className='span'>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Login' : 'Signup'}
          </button>
        </span>
      </div>
    </div>
  );
}

export default App;