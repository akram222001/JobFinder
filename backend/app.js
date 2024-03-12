import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRoutes.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import dbConnction from './database/dbConnection.js';
import {errorMiddleware} from './middlewares/error.js'


const app = express();
dotenv.config({path:"./config/config.env"})

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:['GET', 'POST', 'DELETE', 'PUT'],
    credentials:true,
})
); //its use for middleware


app.use(cookieParser()); //its use for user authorisetion
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/",
})
);
app.use('/api/v1/userRouter',userRouter);
app.use('/api/v1/applicationRoute',applicationRouter);
app.use('/api/v1/jobRouter',jobRouter);

dbConnction();


app.use(errorMiddleware);
export default app;