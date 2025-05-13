const Project = require('../models/project');
const Task = require('../models/task');
const createProject = async (req, res) =>{
    console.log('createProject → req.user:', req.user);
    try {
        const userId = req.user._id;
        const {title, description, dueDate, status} = req.body;
        const projectCount = await Project.countDocuments({user:userId});
        if(projectCount >=4){return res.status(400).json({message:'You have reached the maximum number of projects allowed'})}
        const newProject = new Project({
            title, description, user:userId,status, dueDate
        })
        await newProject.save();
        return res.status(201).json({
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
        return res.status(500).json({message:error.message})
    }
}

const getAllProjects = async (req, res) =>{
    const userId = req.user._id;
    try{
        const projects = await Project.find({user:userId});
        if(!projects || projects.length === 0){
            return res.status(404).json({message:'No projects found'});
        }
        return res.status(200).json({
            message:'Projects fetched successfully',
            projects
        })
    }
    catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const deleteProjectById = async (req, res) => {
    
    const projectId = req.params.projectId;

    try {
        // Check if the project exists and belongs to the user
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        // Delete all tasks related to the project
        await Task.deleteMany({ project: projectId });

        // Delete the project itself
        await Project.findByIdAndDelete(projectId);

        return res.status(200).json({ message: 'Project and associated tasks deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {createProject, getAllProjects, deleteProjectById};