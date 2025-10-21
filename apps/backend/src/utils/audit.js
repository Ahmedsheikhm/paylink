import prisma from "../config/prisma.js";

export const audit = async ({userId = null, action, resourceId = null, meta = {}})=>{
    try{
        await prisma.auditLog.create({
            data: {
                userId,
                action,
                resourceId,
                meta,
            },
        });
    } catch(err){
        //don't let audit failure block user flow, log it
        console.error('Audit Error',err);
    }
};