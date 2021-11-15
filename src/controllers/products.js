// Core node modules.
const path = require('path');

// Local files imports.
const Product = require('../models/Product');
const Comment = require('../models/Comment');
const asyncHandler = require('../utils/middleware/mw_asyncHandler');
const ApiError = require('../utils/classes/APIError');
const { messages, statusCodes } = require('../configs/');

/**
 * @description Get all Products.
 * @route GET /api/products
 * @access Public.
 */
const getAll = asyncHandler(async (request, response, next) => {
    const { search } = request.query;

    let query = {};
    if (search) query = { name: { $regex: search, $options: 'i' } };

    const products = await Product.find(query);

    const topProducts = await Product.find({}, null, {
        limit: 5,
        sort: { rating: -1 },
    });

    response
        .status(statusCodes.OK)
        .json({ success: true, data: { products, topProducts } });
});

/**
 * @description Get one product.
 * @route GET /api/products/:id
 * @access Public.
 */
const getOne = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const product = await Product.findById(id);
    if (!product)
        return next(
            new ApiError(messages.NOT_FOUND('Product'), statusCodes.NOT_FOUND)
        );

    const comments = await Comment.find({ post: id }).populate('user');

    response
        .status(statusCodes.OK)
        .json({ success: true, data: { product, comments } });
});

/**
 * @description Create one Product.
 * @route POST /api/products.
 * @access Private, only ADMIN role.
 */
const create = asyncHandler(async (request, response, next) => {
    const { name, description, price, brand, category, countInStock } =
        request.body;

    const product = { name, description, price, brand, category, countInStock };

    const createdProduct = await Product.create(product);
    if (!createdProduct)
        return next(
            new ApiError(
                messages.NOT_CREATED('Product'),
                statusCodes.INTERNAL_ERROR
            )
        );

    response
        .status(statusCodes.CREATED)
        .json({ success: true, data: { product: createdProduct } });
});

/**
 * @description Update one Product.
 * @route PUT /api/products/:id.
 * @access Private, only ADMIN role.
 */
const updateOne = asyncHandler(async (request, response, next) => {
    const { id } = request.params;
    const { name, description, price, brand, category, countInStock } =
        request.body;

    const product = await Product.findById(id);
    if (!product)
        return next(
            new ApiError(messages.NOT_FOUND('Product'), statusCodes.NOT_FOUND)
        );

    const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        {
            name,
            description,
            price,
            brand,
            category,
            countInStock,
        },
        { new: true }
    );
    if (!updatedProduct)
        return next(
            new ApiError(
                messages.NOT_UPDATED('Product'),
                statusCodes.INTERNAL_ERROR
            )
        );

    response
        .status(statusCodes.CREATED)
        .json({ success: true, data: { product: updatedProduct } });
});

/**
 * @description Delete one Product.
 * @route DELETE /api/products/:id.
 * @access Private, only ADMIN role.
 */
const deleteOne = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const product = await Product.findById(id);
    if (!product)
        return next(
            new ApiError(messages.NOT_FOUND('Product'), statusCodes.NOT_FOUND)
        );

    const deleted = await Product.findByIdAndDelete(product._id);

    response
        .status(statusCodes.OK)
        .json({ success: true, data: { product: deleted } });
});

/**
 * @description Upload product photo
 * @route PUT /api/products/:id/photo
 * @access Private, only ADMIN role.
 */
const uploadPhoto = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    if (!request.files) {
        next(
            new ApiError(
                'The picture should be added!',
                statusCodes.BAD_REQUEST
            )
        );
        return;
    }

    const { file } = request.files;
    if (!file) {
        next(
            new ApiError('The photo should be added!', statusCodes.BAD_REQUEST)
        );
        return;
    }

    const product = await Product.findById(id);
    if (!product)
        return next(
            new ApiError(messages.NOT_FOUND('Product'), statusCodes.NOT_FOUND)
        );

    const filename = `${product._id}_${file.name.split(' ').join('_')}`;
    const mimetype = file.mimetype.split('/').pop();
    const validTypes = ['jpg', 'jpe', 'png', 'jpeg'];

    if (!validTypes.includes(mimetype)) {
        next(new ApiError('Wrong file format!', statusCodes.BAD_REQUEST));
        return;
    }

    const filePath = path.join(__dirname, `../../public/products/${filename}`);
    file.mv(`${filePath}`);

    const fileUrl =
        process.env.NODE_ENV === 'development'
            ? `${request.protocol}://${request.hostname}:${process.env.NODE_PORT}/products/${filename}`
            : `${request.protocol}://${request.hostname}/products/${filename}`;

    const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        {
            $set: {
                photo: fileUrl,
            },
        },
        { new: true }
    );

    response
        .status(statusCodes.CREATED)
        .json({ success: true, data: { product: updatedProduct } });
});

/**
 * @description Create comment.
 * @route POST /api/products/:id/comment
 * @access Private.
 */
const createComment = asyncHandler(async (request, response, next) => {
    const { user, text } = request.body;
    const { id } = request.params;

    const comment = await Comment.create({ post: id, user, text });
    if (!comment) {
        next(
            new ApiError(
                messages.NOT_CREATED('Comment'),
                statusCodes.INTERNAL_ERROR
            )
        );
        return;
    }

    response
        .status(statusCodes.CREATED)
        .json({ success: true, data: { comment } });
});

// Exports.
module.exports = {
    getAll,
    getOne,
    create,
    updateOne,
    deleteOne,
    uploadPhoto,
    createComment,
};
