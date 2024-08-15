import React, { useState } from 'react';
import Categories from './Categories';
import Books from './Books';
import Authors from './Authors';
import './AdminDashboard.css'; // Import the updated CSS file

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Categories');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Categories':
        return <Categories />;
      case 'Books':
        return <Books />;
      case 'Authors':
        return <Authors />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <nav className="admin-nav">
        <button onClick={() => setActiveTab('Categories')}>Categories</button>
        <button onClick={() => setActiveTab('Books')}>Books</button>
        <button onClick={() => setActiveTab('Authors')}>Authors</button>
      </nav>
      <div className="admin-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
