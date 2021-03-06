// create API routes for GET/POST APIs
const notes = require('express').Router();
const notesData = require("../db/db.json");

// use helper
const { v4: uuidv4 } = require('uuid');

const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');



// GET Route for retrieving all the notes (should display left panel)
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});



// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);
// destructuring assignment for request.body
  const { title, text } = req.body;
// if required properties are present
  if (req.body) {
    const newNote = {
      title: title,
      text: text,
      id: uuidv4(),  //automates id
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding Note');
  }
});


module.exports = notes;


