// starter code from class

const express = require('express');
const path = require('path');
// const noteData = require('./db/db')

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
// app.use(clog);

// Middleware for parsing JSON and urlencoded form data
// URL / JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// public folder
app.use(express.static('public'));

// GET Route for html 
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/404.html'))
);

// listening 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
