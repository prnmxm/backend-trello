const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const Conflict = require('../errors/Conflict');
const jwt = require('jsonwebtoken');
const {NODE_ENV, JWT_SECRET} = process.env;

function tokenJwt(res,_id) {
    const secret = NODE_ENV === 'production' ? JWT_SECRET : 'secret';
    const token = jwt.sign({ _id }, secret, {
        expiresIn: '7d',
    });
    res.cookie('jwt', token, {
        maxAge: 24 * 60 * 60 * 1000 * 7,
        httpOnly: true,
        sameSite: true,
    });
    return res;
}

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
        tokenJwt(res, user._id).status(201).send(user.passPrivate());
    } catch (e) {next(e)}

};
module["exports"].userAuth = async (req, res, next) => {
    try {
        const {login,password} = req.body;
        const user = await User.findUser(login,password);
        if(!user) {
            throw new NotFoundError('Юзер не найден')
        }
        tokenJwt(res, user._id).status(201).send(user);
    } catch (e) {
        console.log(e)
        next(e)
    }
};
module["exports"].getUser = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        res.send(user.passPrivate());
    } catch (e) {next(e)}
};