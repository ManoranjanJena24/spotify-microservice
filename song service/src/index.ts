import express from 'express'
import dotenv from "dotenv"
import songRoutes from './route.js'


dotenv.config();

const app = express();

app.use("/api/v1", songRoutes)


const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})