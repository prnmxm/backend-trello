const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const Conflict = require('../errors/Conflict');
const jwt = require('jsonwebtoken');
const {NODE_ENV, JWT_SECRET} = process.env;

module["exports"].createUser = async (req, res, next) => {
    try {
        const {login,password} = req.body;
        const candidate = await User.findOne({login});
        if(candidate) {
            throw new Conflict('Пользователь уже существует');
        }
        const hashPass = await bcryptjs.hash(password, 10);
        const user = new User({login, password:hashPass});
        await user.save();
        res.send(user.passPrivate());
    } catch (e) {next(e)}

};
module["exports"].userAuth = async (req, res, next) => {
    try {
        const {login,password} = req.body;
        const user = await User.findUser(login,password);
        if(!user) {
            throw new Error('Юзер не найден')
        }
        const secret = NODE_ENV === 'production' ? JWT_SECRET : 'secret';
        const token = jwt.sign({ _id: user._id }, secret, {
            expiresIn: '7d',
        });
        res.cookie('jwt', token, {
            maxAge: 24 * 60 * 60 * 1000 * 7,
            httpOnly: true,
            sameSite: true,
        }).end();
    } catch (e) {next(e)}
};