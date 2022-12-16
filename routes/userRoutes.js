const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const { getAllUsers, getUser, createNewUser, updateUser, deleteUser } =
  usersController;

router
  .route('/')
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

router.route('/:id').get(getUser);

module.exports = router;
