const Team = require('../models/team');
const Task = require('../models/Task');

const NotFoundError = require('../errors/NotFoundError');

module["exports"].create = async (req,res,next) => {
    try {
        const data = {title, text, tag} = req.body;
        const task = await Task.create({team: req.team,...data});
        res.send(task);
    } catch (e) {
        next(e)
    }
};
module["exports"].getTask = async (req,res,next) => {
    try {
        const task = await Task.find({team: req.team});
        res.send(task)
    } catch (e) {
        next(e)
    }
};
module["exports"].delTask = async (req,res,next) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndRemove(taskId);
        if(!task) {
            throw new NotFoundError('Такой задачи нет')
        }
        res.send(task);
    } catch (e) {
        next(e)
    }
};
