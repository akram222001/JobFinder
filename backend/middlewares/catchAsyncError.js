export const catchAsyncError = (therFrunction) =>{
    return(req, res, next)=>{
        Promise.resolve(therFrunction(req, res,next)).catch(next);
    };
};