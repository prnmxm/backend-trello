const Team = require('../models/team');
const NotFoundError = require('../errors/NotFoundError');
module["exports"] = async (req,res,next) => {
    try {
        const userId = req.user._id;
        const team = await Team.find({members: userId}).orFail(new NotFoundError('Ты не состоишь в команде'));
        req.team = team[0]._id;
        next();
    } catch (e) {next(e)}
};