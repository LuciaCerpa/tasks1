// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const statusExists = catchAsync(async (req, res, next) => {
	const { status } = req.params;
	const statusArray = ['active',
	'cancelled',	
	'late',
	'completed']

	if (!status in statusArray) {
		return next(new AppError('status not found', 404)); 
	}

	req.status = status;	
	next();
});

module.exports = { statusExists };