class ErrorHandler extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // Fix typo here

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`; // Fix typo here
        err = new ErrorHandler(message, 400);
    }
    
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is Invalid. Try Again`; // Fix typo here
        err = new ErrorHandler(message, 400);
    }
    
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired. Try Again.`; // Fix typo here
        err = new ErrorHandler(message, 400);
    }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;
