const Task = require('../models/task');
const Project = require('../models/project');
const User = require('../models/User');

const createTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, description, status, createdAt, completedAt, projectId } = req.body;

        if (!title || !projectId) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const project = await Project.findOne({ _id: projectId, user: userId });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const newTask = await Task.create({
            title,
            description,
            status,
            createdAt,
            completedAt,
            project: projectId
        });

        return res.status(201).json({
            message: 'Task created successfully',
            task: {
                id: newTask._id,
                title: newTask.title,
                description: newTask.description,
                status: newTask.status,
                createdAt: newTask.createdAt,
                completedAt: newTask.completedAt,
                project: newTask.project,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all tasks of a project
const getAllTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const projectId = req.params.projectId;
        const tasks = await Task.find({ project: projectId });

        if (!tasks) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json({
            message: 'Tasks fetched successfully',
            tasks
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const userId = req.user._id;
        const taskId = req.params.taskId;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Now check if the user owns the project the task belongs to
        const project = await Project.findOne({ _id: task.project, user: userId });
        if (!project) {
            return res.status(403).json({ message: 'Unauthorized to view this task' });
        }

        return res.status(200).json({
            message: 'Task fetched successfully',
            task: {
                id: task._id,
                title: task.title,
                description: task.description,
                status: task.status,
                createdAt: task.createdAt,
                completedAt: task.completedAt,
                project: task.project
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Update a task by ID
const updateTaskById = async (req, res) => {
    
    const taskId = req.params.taskId;
    const { title, description, status, completedAt } = req.body;

    try {
        const task = await Task.findById(taskId); // Corrected this line
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        let completedAt = task.completedAt;

        if (status === 'Completed' && !task.completedAt) {
            completedAt = new Date();
        } else if (status !== 'completed') {
            completedAt = null;
        }

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                title: title || task.title,
                description: description || task.description,
                status: status || task.status,
                completedAt
            },
            { new: true }
        );

        return res.status(200).json({
            message: 'Task updated successfully',
            task: {
                id: updatedTask._id,
                title: updatedTask.title,
                description: updatedTask.description,
                status: updatedTask.status,
                createdAt: updatedTask.createdAt,
                completedAt: updatedTask.completedAt,
                project: updatedTask.project
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete a task by ID
const deleteTaskById = async (req, res) => {
    const taskId = req.params.taskId;
    console.log(taskId)

    try {
        const task = await Task.findById(taskId); // Corrected this line
        console.log('DB', task)
        if (!task) {
            return res.status(404).json({ message: 'Task not found', id:taskId });
        }

        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({
            message: 'Task deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
};
