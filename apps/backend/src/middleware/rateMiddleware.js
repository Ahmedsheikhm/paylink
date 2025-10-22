import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

export const apiSlowDown = slowDown({
    windowMs : 60 *  1000, //1 minute
    delayAfter: 30, //allow 30 requests, then ...
    delayMs : 500, //begin delaying by 500ms per request
});

export const apiRateLimiter  = rateLimit({
    windowMs : 60 * 1000, //1 minute
    max : 100, //limit each IP to 100 requests per windowMs
    standardHeaders : true,
    legacyHeaders : false,
    message : {success: false,message: 'Too many request, try again later. '}, 
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many auth attempts, try later.' }
});