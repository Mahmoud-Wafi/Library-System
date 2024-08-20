import React from 'react';
import './WelcomePage.css';
import Login from './Login';
import Signup from './Signup';

const WelcomePage: React.FC = () => {
  return (
    <div className="home-container">
      <header>
        <Login />
        <h1>Welcome To Good Reads</h1>
      </header>

      <main>
        <section className="popular-section">
          <div className="popular-item">
            <h2>Popular Authors</h2>
            {/* List of authors goes here */}
          </div>
          <div className="popular-item">
            <h2>Popular Books</h2>
            {/* List of books goes here */}
          </div>
          <div className="popular-item">
            <h2>Popular Categories</h2>
            {/* List of categories goes here */}
          </div>
        </section>
        <Signup />

      </main>

      <footer>
        <nav>
          <a href="#">Home</a>
          <a href="#">About us</a>
          <a href="#">Categories</a>
          <a href="#">Authors</a>
          <a href="#">Terms & Conditions</a>
        </nav>
      </footer>
    </div>
  );
};

export default WelcomePage;
