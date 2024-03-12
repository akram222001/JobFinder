import mongoose from "mongoose";

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MERN_STACK_JOB_FINDER",
    }).then(()=>{
        console.log('Connected to database')
    }).catch(()=>{
        console.log(`Some error occured while connecting to database:`);
    });
};


export default dbConnection;