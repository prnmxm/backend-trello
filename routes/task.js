const routes = require('express').Router();
const {create, getTasks, delTask, editTask, getTask, workTask, taskState} = require('../controllers/tasks');
const auth = require('../middlewares/auth');
const team = require('../middlewares/team');
const { celebrate, Joi } = require('celebrate');

routes.post('/', auth, team, celebrate({
    body: Joi.object().keys({
        title: Joi.string().required().min(2),
        text: Joi.string().required().min(2),
        tag: Joi.string().required().min(2)
    })
}), create);
routes.get('/', auth, team, getTasks);
routes.delete('/task/:id', auth, team, celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().length(24)
    })
}),  delTask);
routes.patch('/:id', auth, team,  celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().length(24)
    }),
    body: Joi.object().keys({
        title: Joi.string().min(2),
        text: Joi.string().min(2),
        tag: Joi.string().min(2)
    })
}), editTask);
routes.get('/:id', auth, team, celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().length(24)
    })
}),  getTask);
routes.get('/task/:id', auth, team, celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().length(24),
    })
}),  workTask);
routes.get('/task/state/:id', auth, team, celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().length(24),
    })
}),  taskState);
module.exports = routes;