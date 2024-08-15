import React from 'react';

const Books: React.FC = () => {
  const handleEdit = (id: number) => {
    // Logic for editing the book
  };

  const handleDelete = (id: number) => {
    // Logic for deleting the book
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>The Great Gatsby</td>
          <td>F. Scott Fitzgerald</td>
          <td>
            <button onClick={() => handleEdit(1)}>Add</button>
            <button onClick={() => handleDelete(1)}>Delete</button>
          </td>
        </tr>
        {/* Repeat for other books */}
      </tbody>
    </table>
  );
};

export default Books;
