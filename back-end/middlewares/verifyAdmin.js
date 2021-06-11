const jwt = require('../jwt');

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'missing auth token',
        }); 
}
    const data = jwt.verify(token);
    const { role } = data;
    if (role !== 'administrator') {
        return res.status(401).json({
            message: 'You arent an admin.',
        });
    }
    next();
};

module.exports = verifyAdmin;