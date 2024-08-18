import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !username || !email || !password ) {
      alert('Please fill in all fields');
      return;
    }


    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username); // Append username
    formData.append('email', email);
    formData.append('password', password);

    try {
        const response = await fetch('http://localhost:5000/auth/signup', { // Correct port for backend
            method: 'POST',
            body: formData,
          });
          
      if (response.ok) {
        alert('Signup successful!');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error during signup');
    }
  };

  return (
    <div className="signup-section">
      <h2>New here? Create a free account!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your First Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Enter Your Username" // New username field
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      
     
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
