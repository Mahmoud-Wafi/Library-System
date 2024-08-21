import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WelcomePage.css';
import Login from './Login';
import Signup from './Signup';

interface Book {
  photo: string;
  name: string;
}

interface Author {
  name: string;
  photo: string;
}

interface Category {
  name: string;
}

const WelcomePage: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const bookId = '66bd6f225d245fdbb766e2ba';
    const authorId = '66bd6c315d245fdbb766e2af';
    const categoryId = '66bd6a995d245fdbb766e2aa';

    // Fetch one book
    axios.get(`http://localhost:5000/books/${bookId}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book:', error));

    // Fetch one author
    axios.get(`http://localhost:5000/authors/${authorId}`)
      .then(response => setAuthor(response.data))
      .catch(error => console.error('Error fetching author:', error));

    // Fetch one category
    axios.get(`http://localhost:5000/categories/${categoryId}`)
      .then(response => setCategory(response.data))
      .catch(error => console.error('Error fetching category:', error));
  }, []);

  return (
    <div className="home-container">
      <header>
        <Login />
        <h1>Welcome To Good Reads</h1>
      </header>

      <main>
        <section className="popular-section">
          <div className="popular-item">
            <h2>Popular Author</h2>
            {author ? (
              <div>
                <img src={author.photo} alt={author.name} style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover' }} />
                <p>{author.name}</p>
              </div>
            ) : (
              <p>Loading author...</p>
            )}
          </div>
          <div className="popular-item">
            <h2>Popular Book</h2>
            {book ? (
              <div>
                <img src={book.photo} alt={book.name} style={{ width: '90px', height: '90px' }} />
                <p>{book.name}</p>
              </div>
            ) : (
              <p>Loading book...</p>
            )}
          </div>
          <div className="popular-item">
            <h2>Popular Category</h2>
            {category ? (
              <div>
                <p>{category.name}</p>
              </div>
            ) : (
              <p>Loading category...</p>
            )}
          </div>
        </section>
        <Signup />
      </main>

      <footer>
        <nav>
            <p>Copyright ITI </p>
        </nav>
      </footer>
    </div>
  );
};

export default WelcomePage;
