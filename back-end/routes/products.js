const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');

const route = express.Router();

route.get('/', getProducts);
route.post('/', createProduct);

module.exports = route;