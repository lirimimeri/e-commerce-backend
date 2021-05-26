// Class that represents an error in our API.
class APIError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Exports.
module.exports = APIError;
