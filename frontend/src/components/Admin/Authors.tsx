import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Authors.css';

interface Author {
  _id: string;
  name: string;
}

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newAuthorName, setNewAuthorName] = useState<string>('');

  // Retrieve token from localStorage or other storage
  const token = localStorage.getItem('authToken') || '';

  useEffect(() => {
    // Fetch initial authors from the server
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/authors', {
          headers: { Authorization: `Bearer ${token}` } // Include the token in headers
        });
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, [token]); // Add token as dependency

  const handleDelete = async (_id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/authors/${_id}`, {
        headers: { Authorization: `Bearer ${token}` } // Include the token in headers
      });
      setAuthors(authors.filter(author => author._id !== _id));
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const handleAddButtonClick = (): void => {
    setShowAddForm(true);
  };

  const handleAddAuthor = async (): Promise<void> => {
    if (newAuthorName.trim() === '') {
      alert('Author name cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/authors', 
        { name: newAuthorName },
        { headers: { Authorization: `Bearer ${token}` } } // Include the token in headers
      );
      setAuthors([...authors, response.data]);
      setNewAuthorName('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding author:', error);
      alert('Failed to add author. Please try again.');
    }
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
            <tr key={author._id}>
              <td>{author._id}</td>
              <td>{author.name}</td>
              <td>
                <button onClick={() => handleDelete(author._id)}>Delete</button>
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

export default Authors; // Correct export
