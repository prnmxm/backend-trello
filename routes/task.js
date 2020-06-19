const routes = require('express').Router();
const {create, getTask, delTask} = require('../controllers/tasks');
const auth = require('../middlewares/auth');
const team = require('../middlewares/team');
const { celebrate, Joi } = require('celebrate');

routes.post('/create', celebrate({
    body: Joi.object().keys({
        title: Joi.string().required().min(2).max(16),
        text: Joi.string().required().min(2),
        tag: Joi.string().required().min(2)
    })
}), auth, team, create);
routes.post('/', auth, team, getTask);
routes.delete('/:id',celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().length(24)
    })
}), auth, team, delTask);

module.exports = routes;