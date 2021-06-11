require('dotenv').config();

const config = {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.HOSTNAME,
    database: 'Trybeer',
};

const mysql = require('mysql2/promise');

const connection = mysql.createPool(config);

module.exports = connection;
