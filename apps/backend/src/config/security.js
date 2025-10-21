import helmet from 'helmet';

export const helmetMiddleware = helmet({
    contentSecurityPolicy:{
        directives:{
            defaultSrc:["'self'"],
            scriptSrc:["'self'"],
            styleSrc:["'self'","'unsafe-inline'"],
            imageSrc:["'self'","'data'"],
            connectSrc:["'self'"],
        },
    },
    frameguard:{action:'deny'},
    referrerPolicy:{policy: 'strict-origin-when-cross-origin'},
    crossOriginEmbedderPolicy : false, //adjust if using COEP
});