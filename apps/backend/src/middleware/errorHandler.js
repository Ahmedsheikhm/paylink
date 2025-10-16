/* eslint-disable no-unused-vars */
import pino from 'pino';
const logger = pino();


export const errorHandler = (err,req,res,next)=>{
    //Normolize zod errors
    if(err?.name==='ZodError' || err?.issue){
        const issues = err.issues || err.errors;
        logger.warn({err,issues},'Validation error');
        return res.status(400).json({
            success : false,
            error : 'ValidationError',
            message : 'Invalid request data',
            details : issues.map(i=>({path:i.path.join('.'),message : i.message})),
        });
    }

    //custom errors(if you create App errors)
    if(err?.status && err?.message){
        logger.warn({err},'Client error');
        return res.status(err.status).json({
            success: false,
            error : err.name || 'Error',
            message : err.message,
        });
    }

    // Unexpected errors
  logger.error({ err }, 'Unhandled error');
  return res.status(500).json({
    success: false,
    error: 'ServerError',
    message: 'Something went wrong',
  });
};