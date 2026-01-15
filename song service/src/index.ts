import express from 'express'
import dotenv from "dotenv"
import songRoutes from './route.js'
import redis from 'redis'
import cors from 'cors'


dotenv.config();

export const redisClient = redis.createClient({
  password: process.env.Redis_Password,
  socket: {
    host: "redis-14936.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 14936,
  },
});


redisClient.connect().then(()=> console.log("connected to redis")).catch(console.error)

const app = express();

app.use(cors())

app.use("/api/v1", songRoutes)


const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})