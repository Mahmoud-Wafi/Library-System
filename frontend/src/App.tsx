import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import WelcomePage from "./components/Client/WelcomePage"; 
import Home from './components/Client/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />}/>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

