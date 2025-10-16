import {ZodError} from 'zod';

export const validateBody= (schema)=>(req,res,next)=>{
    try{
        req.body = schema.parse(req.body);
        return next();
    }catch (err){
        if(err instanceof ZodError) return next(err);
        return next(err);
    }
};

export const validateParams = (schema)=>(req,res,next)=>{
    try{
        req.params = schema.parse(req.params);
        return next();
    }catch(err){
        return next(err);
    }
}