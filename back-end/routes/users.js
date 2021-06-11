const express = require('express');

const route = express.Router();
const { logUser, getUser, createUser, editUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

route.post('/login', logUser);
route.post('/signup', createUser);
route.get('/', verifyToken, getUser);
route.put('/', verifyToken, editUser);

module.exports = route;