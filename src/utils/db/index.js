// Third-party packages.
const mongoose = require('mongoose');

// Function that is used to connect to the database.
function connect() {
    const MONGO_HOST = process.env.MONGO_HOST;
    const MONGO_PORT = process.env.MONGO_PORT;
    const MONGO_NAME = process.env.MONGO_NAME;

    const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

    return new Promise((resolve, reject) => {
        mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(() => {
                resolve('Successfully connected to the database!');
            })
            .catch((error) => {
                reject('Failed to connect to the database!', error);
                console.log(error);
            });
    });
}

// Exports.
module.exports = { connect };
