const routes = require('express').Router();
const {create, enter, getTeam, leave} = require('../controllers/teams');
const auth = require('../middlewares/auth');
const team = require('../middlewares/team');
const { celebrate, Joi } = require('celebrate');


routes.post('/', auth, celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(16),
    })
}), create);
routes.get('/:id', auth, celebrate({
    params: Joi.object().keys({
        id: Joi.string().alphanum().required().length(24),
    })
}), enter);
routes.get('/', auth, team, getTeam);
routes.post('/leave', auth, team, leave);
module.exports = routes;