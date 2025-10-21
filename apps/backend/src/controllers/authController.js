import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../config/logger.js';
import { success,fail } from '../utils/response.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10',10);

export const register = asyncHandler(async (req,res)=>{
        const {name,email,password,role} = req.body;
        if(!name||!email||!password||!role){
            return res.status(400).json({message : "name,email,password and role required"});
        }
        //check existing
    const existing = await prisma.user.findUnique({where : {email}});
    if(existing) return fail(res, 'UserExists', 'Email already in use', 409);

    //hash
    const hashed = await bcrypt.hash(password,SALT_ROUNDS);

    const user = await prisma.user.create({
        data : {name,email,password:hashed,role: role || "USER"},
        select : {id:true,name:true,email:true,role:true,createdAt:true,},
    });

    //sign
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  logger.info({ userId: user.id }, 'User registered');

  return success(res, { user, token }, 'User registered', 201);
    
});
//Apply same pattern to login, wallet, transaction controllers as the one done above.(Very important)

export const login = asyncHandler(async (req,res)=>{
    
        const {email,password} = req.body;
        if(!email||!password){
            return fail(res, 'ValidationError', 'Email and password are required', 400);
        }

        const user = await prisma.user.findUnique({where : {email}});
        if(!user){
            return fail(res, 'AuthError', 'Invalid email or password', 401);
        }

        const valid = await bcrypt.compare(password,user.password);
        if(!valid){
            return fail(res, 'AuthError', 'Invalid email or password', 401);
        }

        const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        logger.info({ userId: user.id }, 'User logged in');

        const safeUser = {id:user.id,name:user.name,email:user.email,role:user.role,createdAt:user.createdAt};
        return success(res,{user:safeUser,token},'Login Successfull',200);
});
