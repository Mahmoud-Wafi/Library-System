import React, { useState } from 'react';
import './Author.css';

interface Author {
  id: number;
  name: string;
}

const Author: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([
    { id: 1, name: 'John Doe' }
  ]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newAuthorName, setNewAuthorName] = useState<string>('');

  const handleDelete = (id: number): void => {
    setAuthors(authors.filter(author => author.id !== id));
  };

  const handleAddButtonClick = (): void => {
    setShowAddForm(true);
  };

  const handleAddAuthor = (): void => {
    if (newAuthorName.trim() === '') {
      alert('Author name cannot be empty.');
      return;
    }

    const newId = authors.length > 0 ? authors[authors.length - 1].id + 1 : 1;
    const newAuthor: Author = { id: newId, name: newAuthorName };

    setAuthors([...authors, newAuthor]);
    setNewAuthorName('');
    setShowAddForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewAuthorName(e.target.value);
  };

  const handleCloseForm = (): void => {
    setShowAddForm(false);
    setNewAuthorName('');
  };

  return (
    <div className="container">
      <button onClick={handleAddButtonClick} className="add-button">Add Author</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.name}</td>
              <td>
                <button onClick={() => handleDelete(author.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddForm && (
        <div className="card add-form active">
          <button onClick={handleCloseForm} className="close-button">×</button>
          <h2>Add Author</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddAuthor(); }}>
            <label>
              Author Name:
              <input 
                type="text"
                value={newAuthorName}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Add Author</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Author;
