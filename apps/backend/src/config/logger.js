import pino from "pino";
import pinoHttp from 'pino-http';

const logger = pino({
    level : process.env.LOG_LEVEL || 'info',
    prettyprint: process.env.NODE_ENV !== 'production' && {colorize:true},
});

export const httpLogger  = pinoHttp({logger});
export default logger;
