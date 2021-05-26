// Third-party packages.
const express = require('express');
const { getAll, create, getOne, updateOne, deleteOne } = require('../controllers/categories');
const router = express.Router();

// Routes.
router.route('/').get(getAll).post(create);
router.route('/:id').get(getOne).put(updateOne).delete(deleteOne);

// Exports.
module.exports = router;
