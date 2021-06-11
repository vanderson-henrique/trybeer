const jwt = require('../jwt');
const { getIDByEmail } = require('../models/userModel');

const getEmailByToken = async (req, res, next) => {
    const token = req.headers.authorization;
    const { email } = jwt.verify(token);
    if (!email) {
 return res.status(401).json({ 
        message: 'Jwt malformed',
    }); 
}
    const id = await getIDByEmail(email);
    req.body.userID = id;
    next();
};

module.exports = getEmailByToken;