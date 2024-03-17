import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import { job } from "../models/jobSchema.js"

//edit
export const employerGetAllApplications = catchAsyncError(async(req, res, next) => {
    const { role } = req.user;
    if (role === "JobFinder") {
      return next(
        new ErrorHandler(
          "JobFinder is not allowed to access this resources!",
          400
        )
      );
    }
    const {_id} = req.user;
    const applications = await Application.find({ 'employerID.user': _id});
    res.status(200).json({
      success: true,
      applications
    })
  })

export const jobFinderGetAllApplications = catchAsyncError(async(req, res, next) =>{
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer is not allowed to access this resource!",
        400
        )
      );
    }

    const {_id} = req.user;
    const applications = await Application.find({'applicantID.user': _id});
    res.status(200).json({
      success: true,
      applications,
    });
  }
);


export const jobFinderDeleteApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer is not allowed to access this resource", 400)
      );
    }
    conct = { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Oops, application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      messsage: "Application Deleted Successfully",
    });
  }
);


export const postApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer is not allowed to access this resource", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Require"));
  }
  // const { resume } = req.files;
  const { resume } = req.files;
 // console.log("MIME Type:", resume.mimetype);
  const allowedFofmats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFofmats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler(
        "Invalide file type. please upload your resume in a PNG, JPG OR WEBP Format",
        400
      )
    );
  }
  // resolve
  const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);

if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown cloudinary Error"
    );
    return next(new ErrorHandler("Failed to upload resume.", 500));
}

  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicationID = {
    user: req.user._id,
    role: "JobFinder",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const EmployerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicationID ||
    !EmployerID ||
    !resume
  ) {
    return next(new ErrorHandler(async("Plese fill all field!", 400)));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicationID,
    EmployerID,
    resume:{
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    }
  });
  res.status(200).json({
    success: true,
    messsage: "Application Submitted!",
    application,
  })
});
