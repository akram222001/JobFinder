import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        require: [true, "please provide job titile"],
        minLength: [3, "job title must containt al least 3 character!"],
        maxLength: [50, "job title cannot exceed 50 characters"],
    },
    description:{
        type:String,
        require: [true, "please provide job descsription"],
        minLength: [3, "job description must containt al least 50 character!"],
        maxLength: [350, "job title cannot exceed 350 characters"],
    },
    category:{
        type: String,
        require: [true, "job category is require!"],
    },
    country:{
        type:String,
        require: [true, "job Country is require!"],
    },
    city:{
        type:String,
        require: [true, "job City is require!"],
    },
    location:{
        type:String,
        require: [true, "please provide exact location!"],
        minLength: [50, "job location must containt al least 50 character!"],
    },
    fixedSalary:{
        type: Number,
        minLength:[4, "Fixed salary must contain at least 4 digits!"],
        maxLength: [9, "Fixed salary cannot exceed 9 digits!"],
    },
    salaryFrom:{
        type: Number,
        minLength:[4, "Salary from must contain at least 4 digits!"],
        maxLength: [9, "Salary From cannot exceed 9 digits!"],
    },
    salaryTo:{
        type: Number,
        minLength:[4, "SalaryTo must contain at least 4 digits!"],
        maxLength: [9, "SalaryTo cannot exceed 9 digits!"],
    },
    expired:{
        type: Boolean,
        default:false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref: "user",
        require: true,
    },
})

export const job = mongoose.model("Job", jobSchema);