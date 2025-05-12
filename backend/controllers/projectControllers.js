const Project = require('../models/project');

const createProject = async (req, res) =>{
    try {
        const userId = req.userId;
        const {title, description, dueDate, status} = req.body;
        const projectCount = await Project.countDocuments({user:userId});
        if(projectCount >=4){return res.status(400).json({message:'You have reached the maximum number of projects allowed'})}
        const newProject = new Project({
            title, description, user:userId,status, dueDate
        })
        await newProject.save();
        res.status(201).json({
            message:'Project created successfully',
            project:{
                id:newProject._id,
                title:newProject.title,
                description:newProject.description,
                user:newProject.user,
                status:newProject.status,
                dueDate:newProject.dueDate,
            }
        })

        
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

module.exports = {createProject};