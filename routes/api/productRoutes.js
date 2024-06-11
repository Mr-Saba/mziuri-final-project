const express = require('express');
const router = express.Router();
const { filter } = require('../../controllers/productController');

router.post('/filter', filter);

module.exports = router;
