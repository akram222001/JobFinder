// import express  from "express";
// import { getAllJobs, postJob } from "../controllers/jobController.js";
// import { isAuthorized } from "../middlewares/auth.js"

// const router = express.Router();

// router.get("/getall",getAllJobs);
// router.post("/post",isAuthorized,postJob)

// export default router;

import express from "express";
import { deleteJob, getAllJobs, getmyJobs, postJob, updateJob } from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthorized, postJob);
router.get("/getmyJobs", isAuthorized, getmyJobs);
router.put("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);

export default router;