import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './Login.css'; // Import your CSS file

// Define props interface that extends RouteComponentProps
interface LoginProps extends RouteComponentProps {}

const Login: React.FC<LoginProps> = ({ history }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // Check if credentials are correct
    if (username === 'admin' && password === 'root') {
      // Redirect to AdminDashboard on successful login
      history.push('/admin-dashboard');
    } else {
      // Handle invalid login
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default withRouter(Login);
