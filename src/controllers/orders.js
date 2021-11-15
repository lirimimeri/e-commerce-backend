const Order = require('../models/Order');
const asyncHandler = require('../utils/middleware/mw_asyncHandler');
const ApiError = require('../utils/classes/APIError');
const { messages } = require('../configs');
const { statusCodes } = require('../configs');

/**
 * @description Create an Order.
 * @route POST /api/orders.
 * @access Public.
 */
const create = asyncHandler(async (request, response, next) => {
    const { shippingData, products, address, shippingPrice, totalPrice } = request.body;

    const createdOrder = await Order.create({
        shippingData,
        products,
        shippingPrice,
        totalPrice,
    });
    if (!createdOrder) {
        next(new ApiError(messages.NOT_CREATED('Order'), statusCodes.INTERNAL_ERROR));
    }

    response.status(statusCodes.CREATED).json({ success: true, data: { order: createdOrder } });
});

module.exports = { create };
