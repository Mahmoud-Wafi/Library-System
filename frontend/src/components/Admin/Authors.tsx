import React from 'react';

const Authors: React.FC = () => {
  const handleEdit = (id: number) => {
    // Logic for editing the author
  };

  const handleDelete = (id: number) => {
    // Logic for deleting the author
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>J.K. Rowling</td>
          <td>
            <button onClick={() => handleEdit(1)}>Edit</button>
            <button onClick={() => handleDelete(1)}>Delete</button>
          </td>
        </tr>
        {/* Repeat for other authors */}
      </tbody>
    </table>
  );
};

export default Authors;
