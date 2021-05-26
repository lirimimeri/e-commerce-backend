const messages = {
    NOT_FOUND: (schema, field = 'ID') => `${schema} with given ${field} was not found!`,
    NOT_CREATED: (schema) => `${schema} was not created!`,
    NOT_UPDATED: (schema) => `${schema} was not updated!`,
    NOT_DELETED: (schema) => `${schema} was not deleted!`,
    NOT_AUTHORIZED: 'Not authorized to enter this part of the application!',
    BAD_REQUEST: 'Bad request!',
    USER_EXISTS: 'A user with the given email already exists!',
};

// Exports.
module.exports = messages;
