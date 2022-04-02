// create API routes
const notes = require('express').Router();
const notesData = require("../db/db.json");

// find out if i need to use the helper utils


// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
  const noteID = req.params.note.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteID} has been deleted 🗑️`);
    });
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text, id } = req.body;

  if (req.body) {
    const newNote = {
      title: req.body.title,
      text: req.body.text
      id:,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding Note');
  }
});

module.exports = notes;


