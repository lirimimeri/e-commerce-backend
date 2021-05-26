// Third party-packages.
const express = require('express');
const router = express.Router();

// Local files imports.
const { login } = require('../controllers/auth');

// Routes.
router.route('/login').post(login);

//Exports.
module.exports = router;
