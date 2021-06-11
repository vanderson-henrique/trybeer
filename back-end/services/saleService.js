const convertDate = require('../helpers/convertDate');
const model = require('../models/saleModel');

const createSale = async (obj) => {
    const { products } = obj;
    const date = new Date().toISOString()
    .replace('T', ' ')
    .replace('Z', '');
    const SaleID = await model.createSale({ ...obj, date });
    const response = await model.createSaleProduct(products, SaleID);
    return response;
};

const getSale = async (id) => {
    const data = await model.getSale(id);
    data.forEach((obj) => {
        convertDate(obj);
    });
    return data;
};

const getAll = async () => {
    const data = await model.getAll();
    return data;
};

const updateStatus = async (id) => {
    const data = await model.updateStatus(id);
    return data;
};

const saleById = async (id) => {
    const data = await model.saleById(id);
    const { total_price: totalPrice, sale_id: saleID, status } = data[0];
    const products = data.map((obj) => (
        { quantity: obj.quantity, 
        name: obj.name, 
        price: obj.price }));
    const { sale_date: saleDate } = convertDate(data[0]);
    return {
        saleID,
        saleDate,
        totalPrice,
        status,
        products,
    };
};

module.exports = {
    createSale,
    getSale,
    saleById,
    getAll,
    updateStatus,
};
