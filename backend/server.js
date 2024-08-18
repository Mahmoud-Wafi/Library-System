const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (Replace with your own connection string)
mongoose.connect('mongodb://localhost:27017/bookdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a Schema and Model for Book
const bookSchema = new mongoose.Schema({
    name: String,
    category: String,
    author: String,
    image: String
});
const Book = mongoose.model('Book', bookSchema);

// API Endpoints
app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

app.post('/books', async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
