//Import express
const express = require('express');

// Import modularized notes router
const notesRouter = require('./notes');

// Use express
const app = express();

// adding api routes
app.use('/notes', notesRouter);

module.exports = app;