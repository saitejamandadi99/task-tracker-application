const Task = require('../models/task');
const Project = require('../models/project');

const createTask = async (req, res) =>{
    try {
        const userId = req.userId
        const {title, description, status,createdAt,completedAt,projectId} = req.body;
        if(!title || !projectId){
            return res.status(400).json({message:'Please provide all required fields'});
        }
        const project = await Project.findOne({_id:projectId, user:userId});
        if(!project){
            return res.status(404).json({message:'Project not found'});
        }
        const newTask = await Task.create({
            title, description, status, createdAt, completedAt, project:projectId
        });
        return res.status(201).json({
            message:'Task created successfully',
            task:{
                id:newTask._id,
                title:newTask.title,
                description:newTask.description,
                status:newTask.status,
                createdAt:newTask.createdAt,
                completedAt:newTask.completedAt,
                project:newTask.project,
            }   
        })
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

//get all tasks of a project 
const getAllTasks = async (req, res) =>{
    try {
        const userId = req.userId;
        const projectId = req.params.projectId;
        const project = await Project.findOne({_id:projectId,user:userId});
        if(!project){
            return res.status(404).json({message:'Project not found'});
        }
        const tasks = await Task.find({project:projectId})
        return res.status(200).json({
            message:'Tasks fetched successfully',
            tasks
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

//get a single task by Id 
const getTaskById = async (req,res) =>{
    const userId = req.userId;
    const taskId = req.params.taskId;
    try{
        const task = await Task.findOne(taskId)
        if(!task){
            return res.status(404).json({message:'Task not found'});
        }
        return res.status(200).json({
            message:'Task fetched successfully',
            task:{
                id:task._id,
                title:task.title,
                description:task.description,
                status:task.status,
                createdAt:task.createdAt,
                completedAt:task.completedAt,
                project:task.project
            }
        })
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

//update a task by Id 
const updateTaskById = async (req, res) =>{
    const userId = req.userId;
    const taskId = req.params.taskId;
    const {title, description, status, createdAt, completedAt} = req.body;
    try{
        const task = await Task.findOne(taskId);
        if(!task){
            return res.status(404).json({message:'Task not found'});
        }
        const updatedTask = await Task.findByIdAndUpdate(taskId,{
            title:title||task.title,
            description:description||task.description,
            status:status||task.status,
            completedAt:completedAt||task.completedAt
        },{new:true});
        return res.status(200).json({
            message:'Task updated successfully',
            task:{
                id:updatedTask._id,
                title:updatedTask.title,
                description:updatedTask.description,
                status:updatedTask.status,
                createdAt:updatedTask.createdAt,
                completedAt:updatedTask.completedAt,
                project:updatedTask.project 
    }})

    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

//delete a task by Id 
const deleteTaskById = async (req, res) =>{
    const userId = req.userId;
    const taskId = req.params.taskId;
    try{
        const task = await Task.findOne(taskId)
        if(!task){
            return res.status(404).json({message:'Task not found'});
        }
        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({
            message:'Task deleted successfully',
        })

        }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById
}