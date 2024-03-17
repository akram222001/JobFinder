import express from "express";
import{
    employerGetAllApplications,
    jobFinderDeleteApplications,
    jobFinderGetAllApplications,
    postApplication,
} from "../controllers/applicationContriller.js";

import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/jobfinder/getall", isAuthorized,jobFinderGetAllApplications);
router.get("/employer/getall", isAuthorized,employerGetAllApplications);
router.delete("/delete/:id", isAuthorized,jobFinderDeleteApplications);
router.post("/post", isAuthorized,postApplication);

export default router;