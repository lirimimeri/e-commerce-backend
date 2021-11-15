// Local files imports.
const User = require('../models/User');
const asyncHandler = require('../utils/middleware/mw_asyncHandler');
const ApiError = require('../utils/classes/APIError');
const { statusCodes, messages } = require('../configs');

/**
 * @description Register user.
 * @route POST /api/users.
 * @access Public.
 */
const register = asyncHandler(async (request, response, next) => {
    const { email, password, name, address } = request.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        next(new ApiError('A user with given email already exists!', statusCodes.BAD_REQUEST));
        return;
    }

    const registeredUser = await User.create({ email, password, name, address });
    if (!registeredUser) {
        next(new ApiError(messages.NOT_CREATED('User'), statusCodes.INTERNAL_ERROR));
        return;
    }

    response.status(statusCodes.CREATED).json({ success: true, data: { user: registeredUser } });
});

/**
 * @description Get one user.
 * @route GET /api/users/:id.
 * @access Private, USER and ADMIN role.
 */
const getOne = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const user = await User.findById(id);
    if (!user) {
        next(new ApiError(messages.NOT_FOUND('User'), statusCodes.NOT_FOUND));
        return;
    }

    response.status(statusCodes.OK).json({ success: true, data: { user } });
});

/**
 * @description Get one user.
 * @route PUT /api/users/:id.
 * @access Private, USER and ADMIN role.
 */
const updateOne = asyncHandler(async (request, response, next) => {
    const { id } = request.params;
    const { email, password, name } = request.body;
    const user = await User.findById(id);
    if (!user) {
        next(new ApiError(messages.NOT_FOUND('User'), statusCodes.NOT_FOUND));
        return;
    }

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                email,
                password,
                name,
            },
        },
        { new: true }
    );
    if (!updatedUser) {
        next(new ApiError(messages.NOT_UPDATED('User'), statusCodes.INTERNAL_ERROR));
        return;
    }

    response.status(statusCodes.CREATED).json({ success: true, data: { user: updatedUser } });
});

/**
 * @description Get all users.
 * @route GET /api/users.
 * @access Private, only ADMIN role.
 */
const getAll = asyncHandler(async (request, response, next) => {
    const users = await User.find({});

    response.status(statusCodes.OK).json({ success: true, data: { users } });
});

/**
 * @description Delete one user.
 * @route DELETE /api/users/:id.
 * @access Private, ADMIN role.
 */
const deleteOne = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const user = await User.findById(id);
    if (!user) {
        next(new ApiError(messages.NOT_FOUND('User'), statusCodes.NOT_FOUND));
        return;
    }

    const deletedUser = await User.findByIdAndDelete(user._id);
    if (!deletedUser) {
        next(new ApiError(messages.NOT_DELETED('User'), statusCodes.INTERNAL_ERROR));
        return;
    }

    response.status(statusCodes.OK).json({ success: true, data: { user } });
});

module.exports = { getOne, updateOne, register, getAll, deleteOne };
