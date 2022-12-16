const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesControllers');
const { getAllNotes, getNote, createNewNote, updateNote, deleteNote } =
  notesController;

router
  .route('/')
  .get(getAllNotes)
  .get(getNote)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;
