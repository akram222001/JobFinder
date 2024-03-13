import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please provide your name"],
    minLength: [3, "Name must contian at last 3 characters!"],
    maxLength: [30, "Name cannot exceed 30 character!"],
  },
  email: {
    type: String,
    require: [true, "please provide your email"],
    validator: [validator.isEmail, "please provide a valid email"],
  },
  phone: {
    type: Number,
    require: [true, "please provide your phone Number"],
  },
  password: {
    type: String,
    require: [true, "please provide your password"],
    minLength: [8, "Password must contian at last 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 character!"],
    select: false,
  },
  role: {
    type: String,
    require: [true, "please provide your role"],
    enum: ["JobFinder", "Employer"],
  },
  
  createAt: {
    type: Date,
    default: Date.now,
  },
});

// Hasing this password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Comparing password

// userSchema.methods.comparePassword = async function (entredPassword){
//     return await bcrypt.compare(entredPasswordntredPassword, this.password);
// };

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//GENETATING A JWT TIKEN FOR AUTHORIZATION
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Create and export the User model
export const User = mongoose.model("User", userSchema);

