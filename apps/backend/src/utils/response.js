export const success = (res,payload={},message='OK',status=200)=>{
    return res.status(status).json({success:true,message,data:payload});
};
export const fail = (res,error='Error',message='Failed',status=400)=>{
    return res.status(status).json({success:false,error,message});
};


