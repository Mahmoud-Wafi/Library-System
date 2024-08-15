import React, { useState } from 'react';
import './AdminLogin.css';


const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    // Handle the login logic here (e.g., validate input, call backend API)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="admin-login">
      <h2>Welcome to Admin Panel</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="username">Enter your username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Enter your password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleLogin}>Log in</button>
      </form>
    </div>
  );
};

export default AdminLogin;
