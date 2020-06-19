const routes = require('express').Router();
const {create, getTask, delTask} = require('../controllers/tasks');
const auth = require('../middlewares/auth');
const team = require('../middlewares/team');
const { celebrate, Joi } = require('celebrate');

routes.post('/', auth, team, celebrate({
    body: Joi.object().keys({
        title: Joi.string().required().min(2).max(16),
        text: Joi.string().required().min(2),
        tag: Joi.string().required().min(2)
    })
}), create);
routes.get('/', auth, team, getTask);
routes.delete('/:id', auth, team, celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().length(24)
    })
}),  delTask);

module.exports = routes;