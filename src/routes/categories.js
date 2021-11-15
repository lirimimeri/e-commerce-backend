// Third-party packages.
const express = require('express');
const router = express.Router();

// Local files imports.
const { getAll, create, getOne, updateOne, deleteOne } = require('../controllers/categories');

// Routes.
router.route('/').get(getAll).post(create);
router.route('/:id').get(getOne).put(updateOne).delete(deleteOne);

// Exports.
module.exports = router;
