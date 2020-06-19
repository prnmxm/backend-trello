const Team = require('../models/team');
const User = require('../models/user');
const Conflict = require('../errors/Conflict');
const NotFoundError = require('../errors/NotFoundError');

module["exports"].create = async (req,res,next) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id);
        if(user.team) {
            throw new Conflict('У тебя уже есть команда')
        }
        const {name} = req.body;
        const team = await Team.create({name, creator: user.passPrivate(), members: user});
        await user.update({team});
        res.send(team)
    } catch (e) {next(e)}
};
module["exports"].enter = async (req,res,next) => {
    try {
        const teamId = req.params.id;
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(user.team) {
           throw new Conflict('Ты уже состоишь в команде')
        }
        const team = await Team.findById(teamId);
        if(!team) {
            throw new NotFoundError('Команда не найдена')
        }
        await Promise.all([team.update({$push: {members: userId}}), User.findByIdAndUpdate(userId, {team: team})]);
        res.send({team})
    } catch (e) {next(e)}
};

module["exports"].getTeam = async (req,res,next) => {
    try {
        const userId = req.user._id
        const team = await Team.find({members: userId}).orFail(new NotFoundError('Ты не состоишь в команде'));
        res.send({team})
        // Бесполезная проверка, так как все это проверяется в мидлваре.
    } catch (e) {next(e)}
};
module["exports"].leave = async (req,res,next) => {
    try {
        const userId = req.user._id
        const team = await Team.findById(req.team).orFail(new NotFoundError('Ты не состоишь в команде'));
        if(team.creator.toString() === userId) {
            throw new Conflict('Тебе нельзя выйти')
        }
        await team.update({$pull: {members: userId}});
        await User.findByIdAndUpdate(userId, {$unset:{team: 1}})
        res.send({team})
    } catch (e) {next(e)}
};