import prisma from '../config/prisma.js';

//get wallet for current user
//get /api/wallet

export const getMyWallet = async (req,res)=>{
    try{
        const userId = req.user.id;
        const wallet = await prisma.wallet.findUnique({
            where:{userId},
            include:{transactions:{orderBy:{createdAt:'desc'}}},
        });
        if(!wallet) return res.status(404).json({message : 'Wallet not found'});
        return res.json(wallet);
    }catch (err){
        console.error('getMyWallet error',err);
        return res.status(500).json({message : 'Server error'});
    }   
}
//create wallet for user (if does not exist)
//post /api/wallet
export const createWallet = async (req,res)=>{
    try{
        const userId = req.user.id;
        const existing = await prisma.wallet.findUnique({where: {userId}});
        if(existing) return res.status(409).json({message : 'User already exists'});

        const wallet = await  prisma.wallet.create({
            data :{userId,balance:0 }
        });
        return res.status(201).json(wallet);
    }catch(err){
        console.error('createWallet error',err);
        return res.status(500).json('Server error');
    }
};
//get wallet by userId (Admin)
//get /api/wallet/:id

export const getMyWalletByUserId = async (req,res)=>{
    try{
        const {userId} = req.params;
        const wallet = await prisma.wallet.findUnique({
            where : {userId},
            include: {transactions:true},
        });
        if(!wallet)return res.status(404).json({message : 'Wallet not found'});
        return res.json(wallet);
    }catch(err){
        console.error('getMyWalletById error',err);
        return res.status(500).json({message : 'Server error'});
    }
};