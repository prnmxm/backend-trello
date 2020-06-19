const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const NotFoundError = require('../errors/NotFoundError');



const userSchema = new mongoose.Schema({
   login: {
       type: String,
       required: true,
       unique: true,
       minlength: 6,
       maxlength: 16
   },
   password: {
       type: String,
       minlength: 6,
       required: true,
   },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

userSchema.statics.findUser = function(login, password) {
    return this.findOne({login})
        .then( user => {
            if(!user) {
                throw new NotFoundError('Нет пользователя с таким логином');
            }
            return bcryptjs.compare(password, user.password)
                .then( password => {
                    if(!password) {
                        throw new NotFoundError('Неверный пароль');
                    }
                    return user.passPrivate();
                })
        })
};
userSchema.methods.passPrivate = function() {
    const data = ({password, ...data}) => data;
    return data(this.toObject());
};
module.exports = mongoose.model('User', userSchema);