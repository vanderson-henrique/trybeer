const userModel = require('../models/userModel');
const jwt = require('../jwt');

const createUser = async (name, email, password, role) => {
    const data = await userModel.createUser(name, email, password, role);
    if (data) {
        const token = jwt.sign(data);
        return { ...data, token };
    }
    return data;
};

const logUser = async (email, password) => {
    const data = await userModel.logUser(email, password);
    if (data) {
        const token = jwt.sign(data);
        return { ...data, token };
    }
    return data;
};

const getUser = async (email) => {
    const data = await userModel.getUser(email);
    return data;
};

const editUser = async (name, email) => {
    const data = await userModel.editUser(name, email);
    return data;
};

module.exports = {
    createUser,
    logUser,
    getUser,
    editUser,
};
