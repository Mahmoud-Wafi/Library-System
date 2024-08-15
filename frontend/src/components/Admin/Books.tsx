import React, { useState } from 'react';
import './Book.css';

interface Book {
  id: number;
  title: string;
}

const Book: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'Example Book' }
  ]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newBookTitle, setNewBookTitle] = useState<string>('');

  const handleDelete = (id: number): void => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleAddButtonClick = (): void => {
    setShowAddForm(true);
  };

  const handleAddBook = (): void => {
    if (newBookTitle.trim() === '') {
      alert('Book title cannot be empty.');
      return;
    }

    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
    const newBook: Book = { id: newId, title: newBookTitle };

    setBooks([...books, newBook]);
    setNewBookTitle('');
    setShowAddForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewBookTitle(e.target.value);
  };

  const handleCloseForm = (): void => {
    setShowAddForm(false);
    setNewBookTitle('');
  };

  return (
    <div className="container">
      <button onClick={handleAddButtonClick} className="add-button">Add Book</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddForm && (
        <div className="card add-form active">
          <button onClick={handleCloseForm} className="close-button">×</button>
          <h2>Add Book</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddBook(); }}>
            <label>
              Book Title:
              <input 
                type="text"
                value={newBookTitle}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Add Book</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Book;
