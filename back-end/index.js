const express = require('express');
const cors = require('cors');
const path = require('path');
const { products, sales, users } = require('./routes');

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/products', products);
app.use('/sales', sales);
app.use('/user', users);

app.listen(PORT, () => {
    console.log('App rodando na porta 3001');
});