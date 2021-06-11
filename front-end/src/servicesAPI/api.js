const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

const getUser = (userLogin) => api.post('/user/login', userLogin)
  .then(({ data }) => data)
  .catch((e) => e.message);

const registerUser = (userData) => api.post('/user/signup', userData)
  .then(({ data }) => data)
  .catch((e) => e.message);

const updateNameUser = (userData, token) => api
  .put('/user', userData, { headers: { Authorization: token } })
  .then(({ status }) => status)
  .catch((e) => e.message);

const getProducts = () => api.get('/products')
  .then(({ data }) => data)
  .catch((e) => e.message);

const addSale = (dataSale, token) => api
  .post('/sales', dataSale, { headers: { Authorization: token } })
  .then(({ status }) => status)
  .catch((e) => e.message);

const getSalesByUser = (token) => api
  .get('/sales', { headers: { Authorization: token } })
  .then(({ data }) => data)
  .catch((e) => e.message);

const getSaleById = (token, id) => api
  .get(`/sales/${id}`, { headers: { Authorization: token } })
  .then(({ data }) => data)
  .catch((e) => e.message);

const getSales = (token) => api
  .get('/sales/admin', { headers: { Authorization: token } })
  .then(({ data }) => data)
  .catch((e) => e.message);

const updateSale = (token, id) => api
  .put(`/sales/admin/${id}`, {}, { headers: { Authorization: token } })
  .then(({ status }) => status)
  .catch((e) => e.message);

export {
  getUser,
  registerUser,
  updateNameUser,
  getProducts,
  addSale,
  getSalesByUser,
  getSaleById,
  getSales,
  updateSale,
};
