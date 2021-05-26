// Third-party packages.
const { ValidationError } = require('express-validation');

// Local files.
const APIError = require('../classes/APIError');

// Middleware that helps prepare errors like validation errors for the generic error handler middleware.
function errorHandler(error, request, response, next) {
    if (error instanceof ValidationError) {
        const message = Object.keys(error.details[0])
            .map((key) => error.details[0][key])
            .join(',');
        const err = new APIError(message, error.statusCode);

        return next(err);
    } else if (!(error instanceof APIError)) {
        const err = new APIError(error.message, error.status);

        return next(err);
    }

    return next(error);
}

// Exports.
module.exports = errorHandler;
