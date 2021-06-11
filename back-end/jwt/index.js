const jwt = require('jsonwebtoken');

const key = '38912h2378h4782';

const sign = (data) => jwt.sign(data, key, { algorithm: 'HS256' });
const verify = (token) => jwt.verify(token, key, (err, data) => {
    if (err) return false;
    return data;
});

module.exports = {
    sign,
    verify,
};