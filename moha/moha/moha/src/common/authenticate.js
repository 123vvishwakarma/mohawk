const jwt = require('jsonwebtoken');
const config = require('../../config/app_config.json');

authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, config.secret_key, (err, decoded) => {
        if(!decoded) {
            res.status(401).json({
                message: "Unauthorized",
                data: {},
                statusCode: 401
            });
        } else {
            next();
        }
    });
}

module.exports = { authenticate };
