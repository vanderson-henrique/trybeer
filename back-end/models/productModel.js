const connection = require('../connection');

const createProduct = (data) => data;

const getProducts = async () => {
    const [rows] = await connection.execute('SELECT * FROM Trybeer.products');
    return rows;
};

module.exports = {
    createProduct,
    getProducts,
};