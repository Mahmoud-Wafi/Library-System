import React, { useState } from 'react';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './Login.css'; // Import your CSS file

// Define props interface that extends RouteComponentProps
interface LoginProps extends RouteComponentProps {}

const Login: React.FC<LoginProps> = ({ history }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password
      });

      // Extract isAdmin from response data
      const { isAdmin } = response.data;

      // Store user info and isAdmin flag (optional)
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin));

      // Redirect based on isAdmin flag
      if (isAdmin) {
        history.push('/admin-dashboard');
      } else {
        history.push('/home');
      }
    } catch (error) {
      // Handle invalid login
      console.error('Login error:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="admin-login">
      <div>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default withRouter(Login);
