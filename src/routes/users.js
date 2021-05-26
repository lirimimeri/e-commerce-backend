// Third-party pacakages imports.
const express = require('express');
const router = express.Router();

// Local files imports.
const { register, getAll, getOne, updateOne, deleteOne } = require('../controllers/users');

// Routes.
router.route('/').get(getAll).post(register);
router.route('/:id').get(getOne).put(updateOne).delete(deleteOne);

module.exports = router;
