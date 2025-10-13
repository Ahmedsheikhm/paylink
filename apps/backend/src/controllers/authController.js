import bcrypt from 'bcryptjs';
import prisma from '../config/prisma';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10',10);

export const register = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name||!email||!password){
            return res.status(400).json({message : "nameemail and password required"});
        }
        //check existing
    const existing = await prisma.user.findUnique({where : {email}});
    if(existing) return res.status(409).json({message : "Email already in use"});

    //hash
    const hashed = await bcrypt.hash(password,SALT_ROUNDS);

    const user = await prisma.user.create({
        data : {name,email,passwprd:hashed},
        select : {id:true,name:true,email:true,createdAt:true},
    });

    //sign
    const token = jwt.sign({userId:user.id},JWT_SECRET,{expiresIn:{JWT_EXPIRES_IN}});
    res.status(201).json({user,token});
    }catch (err){
        console.error("register error",err);
        return res.status(500).json({message: "server error"});
    }
};

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({message:'Email and password required'});
        }

        const user = await prisma.user.findUnique({where : {email}});
        if(!user){
            return res.status(401).json({message : 'Invalid credentials'});
        }

        const valid = await bcrypt.compare(password,user.password);
        if(!valid){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({id:user.id},JWT_SECRET,{expiresIn:{JWT_SECRET}});

        const safeUser = {id:user.id,name:user.name,email:user.email,createdAt:user.createdAt};
        return res.json({user:safeUser,token});
    }catch(err){
        console.error('login error',err);
        return res.status(500).json({message : 'Server error'});
    }
};
