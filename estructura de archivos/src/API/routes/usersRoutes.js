const express = require('express');
const router = express.Router();

const { getAvatar, getAllUsers, getUsersById, removeUsers } = require('../../API/controllers/usersController')

/* /api/users */
router
    .get('/avatar/:file', getAvatar)
    .get('/', getAllUsers)
    .get('/:id', getUsersById)
    .delete('/remove/:id', removeUsers)

module.exports = router;