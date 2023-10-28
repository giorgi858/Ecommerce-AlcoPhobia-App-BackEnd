const express = require('express');
const router = express.Router();
const { getAllUser, updateUser, deleteUser } = require('../../controllers/userController');

router.route('/')
    .get(getAllUser)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;