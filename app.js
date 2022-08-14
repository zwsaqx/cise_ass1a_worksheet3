// app.js
const PORT = process.env.PORT || 5000;
const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');
const app = express();

// Connect Database
connectDB();
if (process.env.NODE_ENV === 'production') {
  // serve front-end client from build folder
  app.use(express.static(__dirname+'/../frontend/public'));
  app.get('*', (req, res) =>{
    res.sendFile(__dirname+'/../frontend/public/index.html')
  });

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
