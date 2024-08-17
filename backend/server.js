const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS
require('dotenv').config(); // Make sure dotenv is required

const app = express();
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// Route handling
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');
const categoryRoutes = require('./routes/categories');
const popularRoutes = require('./routes/popular');
const signupRoutes = require('./routes/signup'); 

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/categories', categoryRoutes);
app.use('/popular', popularRoutes);
app.use('/signup', signupRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    const PORT = process.env.PORT || 5173;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    
