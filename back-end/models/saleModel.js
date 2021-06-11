const connection = require('../connection');

const createSale = async (data) => {
    const { date, status = 'Pendente' } = data;
    const response = await connection
    .execute(`INSERT INTO
    Trybeer.sales (user_id,
        total_price, delivery_address, delivery_number, sale_date, status) VALUES
    (?,?,?,?,?,?)`, [data.userID,
        data.total_price, data.delivery_address, data.delivery_number, date, status]);
    return response[0].insertId;
};

const createSaleProduct = async (products, saleID) => {
    await products.map(async (product) => { 
        await connection
        .execute(`INSERT INTO 
        Trybeer.sales_products (sale_id, product_id, quantity) VALUES 
        (?,?,?)`, [saleID, product.id, product.quantity]);
    });
    return saleID;
};

const getSale = async (id) => {
    const [rows] = await connection
    .execute(`SELECT id, sale_date, total_price 
    FROM Trybeer.sales WHERE user_id = ?`, [id]);
    return rows;
};

const getAll = async () => {
    const [rows] = await connection.execute(`SELECT 
    id AS saleId, delivery_address AS deliveryAddress,
    delivery_number AS deliveryNumber,
    total_price AS totalPrice,
    status FROM Trybeer.sales`);
    return rows;
};

const saleById = async (id) => {
    const [rows] = await connection.execute(`
    SELECT t1.total_price, t1.sale_date, t1.status, t2.sale_id, t2.quantity, t3.name, t3.price
    FROM Trybeer.sales AS t1
    INNER JOIN Trybeer.sales_products AS t2
    ON t1.id = t2.sale_id
    INNER JOIN Trybeer.products AS t3
    ON t2.product_id = t3.id
    WHERE t2.sale_id = ?`, [id]);
    return rows;
};

const updateStatus = async (id) => {
    const data = await connection.execute(`UPDATE Trybeer.sales 
    SET status = 'Entregue'
    WHERE id = ?`, [id]);
    return data;
};

module.exports = {
    createSale,
    getSale,
    createSaleProduct,
    saleById,
    getAll,
    updateStatus,
};