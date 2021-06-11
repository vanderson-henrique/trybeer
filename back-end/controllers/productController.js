const productService = require('../services/productService');

const createProduct = async (req, res) => {
    res.send('Ok');
};

const getProducts = async (req, res) => {
    try {
        const data = await productService.getProducts();
        res.json({ data });
    } catch (error) {
        res.status(500).json({
            message: 'We found an error',
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
};
