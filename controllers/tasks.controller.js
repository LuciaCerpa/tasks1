//Models
const { Task } = require('../models/tasks.model');

const { catchAsync } = require('../utils/catchAsync.util');


const getAllTasks = catchAsync(async (req, res, next) => {
		const tasks = await Task.findAll();

		res.status(200).json({
			status: 'success',
			tasks,
		});
});

const createTask = catchAsync(async (req, res, next) => {

		const { userId, title, limitDate } = req.body;

		const newTask = await Task.create({
			userId,
			title,
			startDate: new Date(),
			limitDate	
		});

		res.status(201).json({
			status: 'success',
			newTask,
		});
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
		
	const { status } =req;
	const task = await Task.findAll({where:{status:status}})
	const taskStatus = task.filter(task=>{
		task.status === status
	})
	

	if (!status) {
		return res.status(404).json({
			status: 'error',
			message: 'status not found',
		});
	}
	res.status(201).json({
		status: 'success',
		taskStatus,
		message: status,
		task
	});
	
});

const updateTask = async (req, res, next) => {
	const { id } = req.params;
	

	const task = await Task.findOne({ where: { id } });

	if (!task || task.status !== 'active') {
		return res.status(404).json({
			status: 'error',
			message: 'Task not found',
		});
	}
	
	await task.update({finishDate: new Date()});

	if(Date.parse(task.limitDate) >= Date.parse(task.finishDate) ){
		await task.update({ status:"completed" });
	}else{
		await task.update({ status:"late" });
	}

	res.status(204).json({ status: 'success' });
};

const deleteTask = catchAsync(async (req, res, next) => {
	const { task } = req;

	await task.update({ status: 'cancelled' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllTasks,
	createTask,
	getTaskByStatus,
	updateTask,
	deleteTask,
};
