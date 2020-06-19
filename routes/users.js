const routes = require('express').Router();
const {createUser, userAuth} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

const validation = {
    body: Joi.object().keys({
        login: Joi.string().required().min(6).max(16),
        password: Joi.string().required().min(6)
    })
};
routes.post('/reg', celebrate(validation), createUser);
routes.post('/auth', celebrate(validation), userAuth);

module.exports = routes;