const express = require('express');

const route = express.Router();
const { getSale, 
    saleById, createSale, getAll, updateStatus } = require('../controllers/saleController');
const getEmailByToken = require('../middlewares/getEmailByToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

route.get('/', getEmailByToken, getSale);
route.get('/admin', verifyAdmin, getAll);
route.get('/:id', saleById);
route.post('/', getEmailByToken, createSale);
route.put('/admin/:id', verifyAdmin, updateStatus);

module.exports = route;