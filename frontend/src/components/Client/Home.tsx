import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <header>
        <div className="login-container">
          <input type="text" placeholder="Enter Your Username" />
          <input type="password" placeholder="Enter Your Password" />
          <button>Log In</button>
        </div>
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

        <section className="signup-section">
          <h2>New here? Create a free account!</h2>
          <form>
            <input type="text" placeholder="Enter Your First Name" />
            <input type="text" placeholder="Enter Your Last Name" />
            <input type="email" placeholder="Enter Your Email" />
            <input type="password" placeholder="Enter Your Password" />
            <input type="password" placeholder="Retype Password" />
            <input type="file" placeholder="Upload your image" />
            <button type="submit">Signup</button>
          </form>
        </section>
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

export default Home;
