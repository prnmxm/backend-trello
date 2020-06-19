const routes = require('express').Router();
const {createUser, userAuth, getUser} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const validation = {
    body: Joi.object().keys({
        login: Joi.string().required().min(6).max(16),
        password: Joi.string().required().min(6)
    })
};
routes.post('/signup', celebrate(validation), createUser);
routes.post('/signin', celebrate(validation), userAuth);
routes.get('/', auth , getUser);

module.exports = routes;