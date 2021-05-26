// Third party packages.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Local files imports.
const User = require('../models/User');
const asyncHandler = require('../utils/middleware/mw_asyncHandler');
const ApiError = require('../utils/classes/APIError');
const { statusCodes, messages } = require('../configs');

/**
 * @description Login User.
 * @route POST /api/auth/login
 * @access Public.
 */
const login = asyncHandler(async (request, response, next) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('role email password');
    if (!user) {
        next(new ApiError('Wrong email or password!', statusCodes.BAD_REQUEST));
        return;
    }

    const matchPassword = bcrypt.compareSync(password, user.password);
    if (!matchPassword) {
        next(new ApiError('Wrong email or password!', statusCodes.BAD_REQUEST));
        return;
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });

    response.status(statusCodes.OK).json({ success: true, data: { token } });
});

// Exports.
module.exports = { login };
