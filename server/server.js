import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import applicantRoutes from './Routes/applicants.js';

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/applicants', applicantRoutes);

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Mongo Db is Connected....."))
.catch((err)=>console.error(err))

const port = process.env.PORT || 5000;

app.listen(port,()=>{console.log(`server is running at ${port}`)})