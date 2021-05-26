// Helper middleware to wrap async function so we dont have to use try/catch in our controllers.
function handleAsync(fn) {
    return function (request, response, next) {
        fn(request, response, next).catch(next);
    };
}

// Exports.
module.exports = handleAsync;
