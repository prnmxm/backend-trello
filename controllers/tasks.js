const Team = require('../models/team');
const Task = require('../models/Task');

const NotFoundError = require('../errors/NotFoundError');
const Conflict = require('../errors/Conflict');
const ForbiddenError = require('../errors/ForbiddenError');

module["exports"].create = async (req,res,next) => {
    try {
        const data = {title, text, tag} = req.body;
        const task = await Task.create({team: req.team,...data});
        res.send(task);
    } catch (e) {
        next(e)
    }
};
module["exports"].getTasks = async (req,res,next) => {
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

module["exports"].editTask = async (req,res,next) => {
    try {
        const taskId = req.params.id;
        const data = {title, text, tag} = req.body;
        const task = await Task.findByIdAndUpdate(taskId,data, {new:true,runValidators:true}).orFail(new NotFoundError('Такой задачи нет'));
        res.send(task);
    } catch (e) {
        next(e)
    }
};

module["exports"].getTask = async (req,res,next) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId).orFail(new NotFoundError('Такой задачи нет'));
        res.send(task);
    } catch (e) {
        next(e)
    }
};

module["exports"].workTask = async (req,res,next) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;
        const task = await Task.findById(taskId).orFail(new NotFoundError('Такой задачи нет'));
        if(task.executor && task.executor.toString() === userId) {
            await task.update({$unset: {executor: 1}})
        } else if (!task.executor) {
            await task.update({executor: userId})
        } else {
            throw new Conflict('Эту задачу уже взял кто-то другой')
        }
        res.send(task);
    } catch (e) {
        console.log(e)
        next(e)
    }
};

module["exports"].taskState = async (req,res,next) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;
        const task = await Task.findById(taskId).populate('team').orFail(new NotFoundError('Такой задачи нет'));
        if(task.executor && task.executor.toString() === userId || task.team.creator === userId){
            await task.update({completed: !task.completed});
            res.send(task);
        } else {
            throw new ForbiddenError('Изменять статус может только создатель команды или тот кто работает над задачей');
        }
    } catch (e) {
        next(e)
    }
};