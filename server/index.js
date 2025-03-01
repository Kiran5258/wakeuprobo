import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import cors from 'cors'
import userroutes from './router/user.router.js'
import authrouter from './router/auth.router.js'
import postrouter from './router/newpost.route.js'
import cookieParser from 'cookie-parser';
dotenv.config();

const port=3000

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log('db is connected')
}).catch((err)=>{
  console.log(err)
})
const app=express();
app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/server/user',userroutes);
app.use('/server/auth',authrouter);
app.use('/server/postrouter',postrouter)

app.listen(3000,()=>{
  console.log( `http://localhost:${port}`)
})
app.use((error,req,res,next)=>{
  const status=error.statusCode||500
  const msg=error.message||'Internet Error'
  res.status(status).json({
    success:false,
    status, 
    msg
  })
})