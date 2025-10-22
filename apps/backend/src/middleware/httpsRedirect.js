export const enforceHttps = (req,res,next)=>{

    if(process.env.NODE_ENV==='production'){
        if(!req.secure && req.get('x-forwarded-proto')!=='https'){
            return res.redirect(301,`https://${req.get('host')}${req.originalUrl}`);
        }
    }
    next();
};