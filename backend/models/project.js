const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,

    },
    description:{
        type:String,
        trim: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
    status:{
        type:String,
        enum:['To Do','In Progress', 'Completed', 'On Hold'],
        default:'To Do'
    }, 
    dueDate:{
        type:Date,

    }
});

module.exports = mongoose.model('Project', projectSchema)