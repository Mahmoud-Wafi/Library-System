import React, { useState } from 'react';
import './Categories.css';

interface Category {
  id: number;
  name: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Culture' }
  ]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  const handleDelete = (id: number): void => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleAddButtonClick = (): void => {
    setShowAddForm(true);
  };

  const handleAddCategory = (): void => {
    if (newCategoryName.trim() === '') {
      alert('Category name cannot be empty.');
      return;
    }

    const newId = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;
    const newCategory: Category = { id: newId, name: newCategoryName };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setShowAddForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewCategoryName(e.target.value);
  };

  const handleCloseForm = (): void => {
    setShowAddForm(false);
    setNewCategoryName('');
  };

  return (
    <div className="container">
      <button onClick={handleAddButtonClick} className="add-button">Add Category</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleDelete(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddForm && (
        <div className="card add-form active">
          <button onClick={handleCloseForm} className="close-button">×</button>
          <h2>Add Category</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
            <label>
              Category Name:
              <input 
                type="text"
                value={newCategoryName}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Add Category</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Categories;
