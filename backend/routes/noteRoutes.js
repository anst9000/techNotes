const express = require("express")
const router = express.Router()
const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController")

router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote)

module.exports = router
