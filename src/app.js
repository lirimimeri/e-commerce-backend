// Third party packages.
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./utils/middleware/mw_errorHandler');
const genericErrorHandler = require('./utils/middleware/mw_genericErrorHandler');
const fileUpload = require('express-fileupload');

//Local files.
const routesProducts = require('./routes/products');
const routesUsers = require('./routes/users');
const routesAuth = require('./routes/auth');
const routesCategories = require('./routes/categories');
const routesOrders = require('./routes/orders');

// General middlewares.
app.use(express.json({ limit: '20mb' }));
app.use(express.static('public'));
app.use(cors());
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

// Mount Routes.
app.use('/api/products', routesProducts);
app.use('/api/users', routesUsers);
app.use('/api/auth', routesAuth);
app.use('/api/categories', routesCategories);
app.use('/api/orders', routesOrders);

// Error handling middlewares.
app.use(errorHandler);
app.use(genericErrorHandler);

// Exports.
module.exports = app;
