const httpStatus = require('http-status');
module.exports = {
     ErrorHandler: (err,req, res, next) => {
        return res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({
            message: err.message,
            status: err.status,
            stack: err.stack
        });
    },
    NotFoundError: (req, res, next)=>{
        const err = new Error('Not Found...');
        err.status = httpStatus.NOT_FOUND;
        next(err);
    }
};