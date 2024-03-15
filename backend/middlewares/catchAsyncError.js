export const catchAsyncError = (therFunction) =>{
    return(req, res, next)=>{
        Promise.resolve(therFunction(req, res,next)).catch(next);
    };
};
