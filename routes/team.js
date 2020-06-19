const routes = require('express').Router();
const {create, enter, getTeam} = require('../controllers/teams');
const auth = require('../middlewares/auth');
const team = require('../middlewares/team');
const { celebrate, Joi } = require('celebrate');

routes.post('/create', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(16),
    })
}), auth, create);
routes.get('/:id',celebrate({
    params: Joi.object().keys({
        id: Joi.string().alphanum().required().length(24),
    })
}), auth, enter);
routes.post('/', auth, team, getTeam);

module.exports = routes;