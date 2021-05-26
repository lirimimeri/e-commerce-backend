// Local files imports.
const Category = require('../models/Category');
const asyncHandler = require('../utils/middleware/mw_asyncHandler');
const ApiError = require('../utils/classes/APIError');
const { statusCodes, messages } = require('../configs');

/**
 * @description Get all categories.
 * @route GET /api/routes/categories.
 * @access Private, only ADMIN role.
 */
const getAll = asyncHandler(async (request, response, next) => {
    const categories = await Category.find({});

    response.status(statusCodes.OK).json({ success: true, data: { categories } });
});

/**
 * @description Get one category.
 * @route GET /api/routes/categories/:id.
 * @access Private, only ADMIN role.
 */
const getOne = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const category = await Category.findById(id);
    if (!category) {
        next(new ApiError(messages.NOT_FOUND('Category'), statusCodes.NOT_FOUND));
        return;
    }

    response.status(statusCodes.OK).json({ success: true, data: { category } });
});

/**
 * @description Create a Category.
 * @route PORT /api/categories.
 * @access Private, only ADMIN role.
 */
const create = asyncHandler(async (request, response, next) => {
    const { name, description } = request.body;

    const createdCategory = await Category.create({ name, description });
    if (!createdCategory) {
        next(new ApiError(messages.NOT_CREATED('Category'), statusCodes.INTERNAL_ERROR));
        return;
    }

    response
        .status(statusCodes.CREATED)
        .json({ success: true, data: { category: createdCategory } });
});

/**
 * @description Update one Product.
 * @route PUT /api/categories/:id.
 * @access Private, only ADMIN role.
 */
const updateOne = asyncHandler(async (request, response, next) => {
    const { id } = request.params;
    const { name, description } = request.body;

    const category = await Category.findById(id);
    if (!category) {
        next(new ApiError(messages.NOT_FOUND('Category'), statusCodes.NOT_FOUND));
        return;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        category._id,
        {
            $set: {
                name,
                description,
            },
        },
        { new: true }
    );

    response
        .status(statusCodes.CREATED)
        .json({ success: true, data: { category: updatedCategory } });
});

/**
 * @description Delete one Category.
 * @route DELETE /api/categories/:id.
 * @access Private, only admin role.
 */
const deleteOne = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const category = await Category.findById(id);
    if (!category) {
        next(new ApiError(messages.NOT_FOUND('Category'), statusCodes.NOT_FOUND));
        return;
    }

    const deletedCategory = await Category.findByIdAndDelete(category._id);
    if (!deletedCategory) {
        next(new ApiError(messages.NOT_DELETED('Category'), statusCodes.INTERNAL_ERROR));
        return;
    }

    response.status(statusCodes.OK).json({ success: true, data: { category } });
});

module.exports = { getAll, getOne, create, updateOne, deleteOne };
