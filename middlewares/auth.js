const jwt = require('jsonwebtoken');

const {NODE_ENV, JWT_SECRET} = process.env;

const handleAuthError = (res) => {
    res
        .status(401)
        .send({ message: 'Необходима авторизация' });
};
module.exports = (req, res, next) => {

    const token = req.cookies.jwt;
    if (!token) {
        return handleAuthError(res);
    }
    const secret = NODE_ENV === 'production' ? JWT_SECRET : 'secret';
    let payload;
    try {
        payload = jwt.verify(token, secret);
    } catch (e) {
        return handleAuthError(res);
    }
    req.user = payload;
    return next();
};
