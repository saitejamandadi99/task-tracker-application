const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        trim:true,
    },
    status:{
        type:String,
        enum:['To Do', 'In Progress', 'Completed', 'On Hold'],
        default:'To Do',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    completedAt:{
        type:Date,
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:true
    }
})

module.exports = mongoose.model('Task', taskSchema);