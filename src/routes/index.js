const express = require('express')
const router = express.Router()
const UserRoute = require('./userRoute')
const productRoute = require('./productRoute');

UserRoute(router);
productRoute(router);

module.exports = router;