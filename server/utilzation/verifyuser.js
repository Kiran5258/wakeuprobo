import jwt from 'jsonwebtoken'
import { errormsg } from './404.js'
export const verifyuser=(req,res,next)=>{
    const usetoken=req.cookies.access_token
    if(!usetoken){
        return next(errormsg(401,'unauthorized'))
    }
    jwt.verify(usetoken,process.env.JWT_SECERT_KEY,(err,user)=>{
        if(err){
            return next(errormsg(401,'unauthorized'))
        }
        req.user=user;
        next();
    })
}