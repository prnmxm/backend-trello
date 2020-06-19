const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength:2
    },
    text: {
        type: String,
        required: true,
        minlength: 2
    },
    tag: {
        type: String,
        required: true,
        minLength: 2,
        maxlength: 16
    },
    completed: {
        type: Boolean,
        default: false
    },
    executor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

module["exports"] = mongoose.model('Task', taskSchema);