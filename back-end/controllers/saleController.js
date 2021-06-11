const service = require('../services/saleService');

const messageErr = 'We found an error';

const createSale = async (req, res) => {
    // const obj = { user_id, total_price, delivery_address, delivery_number, products }
    try {
        const data = await service
        .createSale(req.body);
        if (data) return res.status(201).json({ message: 'Sale registered' });
    } catch (error) {
        res.status(500).json({
            message: messageErr,
        });
    }
};

const getAll = async (req, res) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: messageErr,
        });
    }
};

const getSale = async (req, res) => {
    const { userID } = req.body;
    try {
        const data = await service.getSale(userID);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: messageErr,
        });
    }
};

const saleById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await service.saleById(id);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: messageErr,
        });
    }
};

const updateStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await service.updateStatus(id);
        if (data) return res.status(204).json();
    } catch (error) {
        return res.status(500).json({
            message: messageErr,
        });
    }
};

module.exports = {
    createSale,
    getSale,
    saleById,
    getAll,
    updateStatus,
};
