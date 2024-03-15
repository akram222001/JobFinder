import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/error.js";
import { job } from "../models/jobSchema.js";
import { job as JobModel } from "../models/jobSchema.js";

// import { job } from "../models/jobSchema.js"; // Import job only once
// import { job as JobModel } from "../models/jobSchema.js"; // Rename the other import


export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

// export const postJob = catchAsyncError(async (req, res, next) => {
//   const { role } = req.user; //distructure
//   if (role == "JobFinder") {
//     return next(
//       new ErrorHandler("JobFinder is not allowed to access this resources", 400)
//     );
//   }
//   const {
//     title,
//     description,
//     category,
//     country,
//     city,
//     location,
//     fixedSalary,
//     salaryFrom,
//     salaryTo,
//   } = req.body;
//   if (!title || !description || !category || !country || !city || !location) {
//     return next(new ErrorHandler("Please provide full job details", 400));
//   }

//   if ((!salaryFrom || !salaryTo) && !fixedSalary) {
//     return next(
//       new errorMiddleware(
//         "Please either provide fixed salary or ranged salary!"
//       )
//     );
//   }
//   if (salaryFrom && salaryTo && fixedSalary) {
//     return next(
//       new errorMiddleware(
//         "Cannot enter fixed salary and range salary together!"
//       )
//     );
//   }
//   const postedBy = req.user._id;
//   const job = await job.create({
//     title,
//     description,
//     category,
//     country,
//     city,
//     location,
//     fixedSalary,
//     salaryFrom,
//     salaryTo,
//     postedBy,
//   });
//   res.status(200).json({
//     success: true,
//     message: "Job posted successfully!",
//     job,
//   });
// });


//Job post 
export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user; // Destructure
  if (role == "JobFinder") {
    return next(
      new ErrorHandler("JobFinder is not allowed to access this resources", 400)
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new errorMiddleware(
        "Please either provide fixed salary or ranged salary!"
      )
    );
  }
  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new errorMiddleware(
        "Cannot enter fixed salary and range salary together!"
      )
    );
  }
  const postedBy = req.user._id;
  const newJob = await JobModel.create({ // Using renamed variable here
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job posted successfully!",
    job: newJob,
  });
});


// export const getmyJobs = catchAsyncError(async(req, res, next)=>{
//   const {role} = req.user;
//   if (role == "JobFinder") {
//     return next(
//       new ErrorHandler("JobFinder is not allowed to access this resources", 400)
//     );
//   }
//   const myjobs = await job.find({postedBy: req.user._id});
//   res.status(200).json({
//     success:true,
//     myjobs,
//   })
// })


//found job post details
export const getmyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "JobFinder") {
    return next(
      new ErrorHandler("JobFinder is not allowed to access this resource", 400)
    );
  }
  const myjobs = await job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myjobs,
  });
});

//Update job posted details
export const updateJob = catchAsyncError(async(req, res, next)=>{
  const { role } = req.user;
  if(role === "JobFinder"){
    return next(new ErrorHandler("JobFinder is not allowed to access this resources!",400))
  }
  const { id } = req.params;
  let Job = await JobModel.findById(id);
  if(!Job){
    return next(new ErrorHandler("Oops, Job not found!",404));
  }
  Job = await job.findByIdAndUpdate(id, req.body,{
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    job,
    message: "Job Updated Successfully!",
  });
});

//job post Deleted
export const deleteJob = catchAsyncError(async(req, res, next)=>{
  const { role } = req.user;
  if(role === "JobFinder"){
    return next(new ErrorHandler("JobFinder is not allowed to access this resources!",400))
  }
  const { id } = req.params;
  const job = await JobModel.findById(id);
  if(!job){
    return next(new ErrorHandler("Oops, Job not found!",404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message:"job Deleted Successgully",
  });
});
