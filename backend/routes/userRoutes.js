import express from "express";
import { register } from "../controllers/userController.js";

const router = express.Router();

// POST request for user registration
router.post("/register", register);

export default router;