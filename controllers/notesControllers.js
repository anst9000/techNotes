const Note = require('../models/Note');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

// ----------------------------------------------------------------------------
// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  // Get all notes from MongoDB
  const notes = await Note.find().lean();

  // If no notes
  if (!notes?.length) {
    return res.status(400).json({ message: 'No notes found' });
  }

  // Add username to each note before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    }),
  );

  res.json(notesWithUser);
});
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// @desc    Get single note
// @route   GET /notes/:id
// @access  Private
const getNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No note with id :${id}` });
  }

  const note = await Note.findById(id).lean();
  if (!note) {
    return res.status(400).json({ message: 'Note not found' });
  }

  const user = await User.findById(note.user).lean().exec();
  const noteWithUser = (note.username = user.username);

  res.json(noteWithUser);
});
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// @desc    Create new Note
// @route   POST /Notes
// @access  Private
// ----------------------------------------------------------------------------
const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  // Confirm data
  if (!user || !title || !text) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate note title' });
  }

  // Create and store the new user
  const note = await Note.create({ user, title, text });

  if (note) {
    // Created
    return res.status(201).json({ message: 'New note created' });
  } else {
    return res.status(400).json({ message: 'Invalid note data received' });
  }
});
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// @desc    Update a Note
// @route   PATCH /Notes
// @access  Private
// ----------------------------------------------------------------------------
const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  // Confirm data
  if (!id || !user || !title || !text || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Confirm note exists to update
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: 'Note not found' });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  // Allow renaming of the original note
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate note title' });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json(`'${updatedNote.title}' updated`);
});

// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// @desc    Delete a Note
// @route   DELETE /Notes
// @access  Private
// ----------------------------------------------------------------------------
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Note ID required' });
  }

  // Confirm note exists to delete
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: 'Note not found' });
  }

  const result = await note.deleteOne();

  const reply = `Note '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

// ----------------------------------------------------------------------------

module.exports = {
  getAllNotes,
  getNote,
  createNewNote,
  updateNote,
  deleteNote,
};
