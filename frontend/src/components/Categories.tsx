import React from 'react';

const Categories: React.FC = () => {
  const handleEdit = (id: number) => {
    // Logic for editing the category
  };

  const handleDelete = (id: number) => {
    // Logic for deleting the category
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
          <td>Culture</td>
          <td>
            <button onClick={() => handleEdit(1)}>Edit</button>
            <button onClick={() => handleDelete(1)}>Delete</button>
          </td>
        </tr>
        {/* Repeat for other categories */}
      </tbody>
    </table>
  );
};

export default Categories;
