const productModel = require('../models/productModel');

const createProduct = (data) => data;

const getProducts = async () => {
    const data = await productModel.getProducts();
    return data;
};

module.exports = {
    createProduct,
    getProducts,
};
