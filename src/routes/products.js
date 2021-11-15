// Third-party packages.
const express = require('express');
const router = express.Router();

// Local files imports.
const {
    getAll,
    getOne,
    create,
    updateOne,
    deleteOne,
    uploadPhoto,
    createComment,
} = require('../controllers/products');

// Routes.
router.route('/').get(getAll).post(create);

router.route('/:id').get(getOne).put(updateOne).delete(deleteOne);

router.route('/:id/photo').put(uploadPhoto);

router.route('/:id/comment').post(createComment);

// Exports.
module.exports = router;
