import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../config/prisma.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const requireAuth = async (req,res,next)=>{
    try{
        const auth = req.headers.authorization;
        if(!auth || !auth.startsWith('Bearer')){
            return res.status(401).json({message : 'Authorization required'});
        }

        const token  =auth.split(' ')[1];
        const payload = jwt.verify(token,JWT_SECRET);

        //await user fetch from DB
        const user = await prisma.user.findUnique({where : {id:payload.id}});
        if(!user){
            return res.status(401).json({message : 'Invalid token (user not found)'});
        }
        req.user = {id:user.id,name:user.name,email:user.email};
        return next();
    }catch(err){
        console.error('auth middleware error',err);
        return res.status(401).json({message : 'Invalid or expired token'});
    }
};