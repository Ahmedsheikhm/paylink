import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

export const apiSlowdown = slowDown({
    windoMs : 60 *  1000, //1 minute
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