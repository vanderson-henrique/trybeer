const connection = require('../connection');

const createUser = async (name, email, password, role) => {
    await connection
            .execute(`INSERT INTO 
            Trybeer.users (name, email, password, role) VALUES 
            (?,?,?,?)`, [name, email, password, role]);
    return {
        name,
        email,
        role,
    };
};

const logUser = async (email, password) => {
    const [data] = await connection
    .execute(`SELECT name, email, password, role 
    FROM Trybeer.users 
    WHERE email = ? AND password = ?`, [email, password]);
    if (!data) return null;
 return {
        name: data[0].name,
        email: data[0].email,
        role: data[0].role,
    }; 
};

const getUser = async (email) => {
    const [data] = await connection
    .execute(`SELECT name, email
    FROM Trybeer.users 
    WHERE email = ?`, [email]);
    if (!data) return null;
 return {
        name: data[0].name,
        email: data[0].email,
    }; 
};

const getIDByEmail = async (email) => {
    const [data] = await connection.execute(`SELECT id 
    FROM Trybeer.users
    WHERE email = ?`, [email]);

    return data[0].id;
};

const editUser = async (name, email) => {
    await connection.execute(`UPDATE Trybeer.users
                              SET name = ?
                              WHERE email = ?`, [name, email]);
    return {
        name,
        email,
    };
};

module.exports = {
    createUser,
    logUser,
    getUser,
    editUser,
    getIDByEmail,
};