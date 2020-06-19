const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
   name: {
       type: String,
       minlength: 2,
       maxlength: 16,
       required: true
   },
    creator: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
       type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Team', teamSchema);