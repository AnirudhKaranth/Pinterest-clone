import express from 'express'
const app = express();

import dotenv from 'dotenv'
dotenv.config();

import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from "./DB/db.js";
import notFoundMiddleware from './middleware/notFound.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';

import userRoutes from './routes/userRoutes.js';
import pinRoutes from './routes/pinRoutes.js';
app.use(bodyParser.json({ limit : "30mb", extended: true}));
app.use(cors());
app.use(express.json());
app.get("/",(req, res)=>{
    res.send("hello world")
})

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/pin", pinRoutes)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port = 5000;
const start = async()=>{
    try {
        
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`App is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()