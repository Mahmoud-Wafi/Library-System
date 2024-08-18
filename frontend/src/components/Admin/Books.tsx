import React, { useState } from 'react';
import './Book.css';

interface Book {
    id: number;
    name: string;
    category: string;
    author: string;
    image: string;
}

const Book: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
        name: '',
        category: '',
        author: '',
        image: '',
    });

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setNewBook(prevBook => ({
            ...prevBook,
            [name]: name === 'image' && files ? URL.createObjectURL(files[0]) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = books.length ? books[books.length - 1].id + 1 : 1;
        setBooks([...books, { id, ...newBook, image: newBook.image || 'default.jpg' }]);
        setNewBook({ name: '', category: '', author: '', image: '' });
        toggleForm();
    };

    return (
        <div className="container">
            <button className="add-button" onClick={toggleForm}>Add Book</button>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>CategoryID</th>
                        <th>Author ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td><img src={book.image} alt="Book Cover" style={{ width: '50px', height: 'auto' }} /></td>
                            <td>{book.name}</td>
                            <td>{book.category}</td>
                            <td>{book.author}</td>
                            <td>
                                <button>Edit</button> <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showForm && (
                <div className="card add-form active">
                    <button className="close-button" onClick={toggleForm}>&times;</button>
                    <h2>Add Book</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Book Name:
                            <input
                                type="text"
                                name="name"
                                value={newBook.name}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Category:
                            <input
                                type="text"
                                name="category"
                                value={newBook.category}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Author:
                            <input
                                type="text"
                                name="author"
                                value={newBook.author}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Image:
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleInputChange}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Book;
