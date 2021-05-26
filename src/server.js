//Third party packages.
const dotnev = require('dotenv');

//Local files.
const db = require('./utils/db');
const app = require('./app');

//Load env files.
dotnev.config({ path: './config.env' });

const PORT = process.env.NODE_PORT || 5000;
const MODE = process.env.NODE_ENV || 'development';

// Connect to database and start server
db.connect()
    .then((message) => {
        console.log(message);
        app.listen(PORT, () => console.log(`Server running on PORT ${PORT} on ${MODE} mode`));
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
