// Third-party packages.
const express = require('express');
const router = express.Router();

// Local files imports.
const { create } = require('../controllers/orders');

// Routes.
router.route('/').post(create);

// Exports.
module.exports = router;
