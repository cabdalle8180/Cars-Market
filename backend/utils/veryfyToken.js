import jwt from "jsonwebtoken";
import {errHandaling} from '../utils/error.js'

export const verifyToken= async (req,res,next)=>{
    const token= req.cookies.access_token
    if(!token) return next(errHandaling(401,'Anauthorized'));
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errHandaling(401,'Anauthorized'));
        req.user=user;
        next();
    })
}