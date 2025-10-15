import prisma from "../config/prisma.js";

//depostit into current users wallet
//post /api/transactions/deposit
//body {amount : number, description?: string}

export const deposit = async (req,res)=>{
    try{
        const userId = req.user.id;
        const {amount,description} = req.body;
        if(typeof amount !== 'number' || amount <= 0){
            return res.status(400).json({message : 'amount must be a positive number'});
        }

        //atomic update: create transaction and update wallet balance
        const result = await prisma.$transaction(async (tx)=>{
            const wallet = await tx.wallet.findUnique({where : {userId}});
            if(!wallet) throw new Error('WALLET_NOT_FOUND');

            const newBalance = wallet.balance + amount;
            await tx.wallet.update({
                where : {userId},
                data : {balance : newBalance},
            });

            const txn = tx.transaction.create({
                data : {
                    amount,
                    type : 'CREDIT',
                    description : description || 'deposit',
                    walletId : wallet.id,
                },
            });
            return {wallet:{...wallet,balance:newBalance},txn};
        });
        return res.status(201).json({wallet : result.wallet,transaction:result.transaction});
    }catch (err){
        console.error('deposit error',err);
        if(err.message==='WALLET_NOT_FOUND') return res.status(404).json({message : 'wallet not found'});
        return res.status(500).json({message : 'Server error'});
    }
};

//withdraw from current users wallet
//POST /api/transactions/withdraw
//body : {amount: number,description?:string}

export const withdraw = async (req,res)=>{
    try{
        const userId = req.user.id;
        const {amount,description} = req.body;
        if(typeof amount !=='number'||amount <= 0 ){
            return res.status(400).json({message : 'amount must be a positive number'});
        }

        const result = await prisma.$transaction(async (tx)=>{
            const wallet = await tx.wallet.findUnique({where:{userId}});
            if(!wallet) throw new Error('WALLET_NOT_FOUND');
            if(wallet.balance<amount) throw new Error('INSUFFICIENT_FUNDS');

            const newBalance = wallet.balance - amount;
            await tx.wallet.update({
                where : {userId},
                data : {balance : newBalance}
            });

            const txn = await tx.transaction.create({
                data : {
                    amount,
                    type: 'DEBIT',
                    description : description || 'withdraw',
                    walletId : wallet.id,
                },
            });
            return {wallet : {...wallet,balance:newBalance},txn};
        });
        return res.status(201).json({wallet : result.wallet,transaction:result.txn});
    }catch (err){
        console.error('withdraw error',err);
        if(err.message==='WALLET_NOT_FOUND')return res.status(404).json({message : 'wallet not found'});
        if(err.message==='INSUFFICIENT_FUNDS')return res.status(400).json({message : 'Insufficient funds'});
        return res.status(500).json({message : 'Server error'});
    }
};

//transfer from current users id to another users id
//POST /api/transaction/transfer
//body:{toUserId:string,amount:number,description?:string}
export const transfer = async (req,res)=>{
    try{
        const fromUserId=req.user.id;
        const {toUserId,amount,description}=req.body;
        if(!toUserId)return res.status(400).json({message : 'toUserId required'});
        if(typeof amount!=='number'||amount<=0)return res.status(400).json({message : 'amount needs to be a positive number'});
        if(toUserId===fromUserId)return res.status(400).json({message : 'cannot transfer to self'});

        const result = await prisma.$transaction(async (tx)=>{
            const fromWallet = await tx.wallet.findUnique({where : {userId :fromUserId}});
            const toWallet = await tx.wallet.findUnique({where : {userId : toUserId}});

            if(!fromWallet)throw new Error('FROM_WALLET_NOT_FOUND');
            if(!toWallet)throw new Error('TO_WALLET_NOT_FOUND');
            if(fromWallet.balance<amount)throw new Error('INSUFICIENT_FUNDS');

            //update balance
            const newFromBalance = fromWallet.balance - amount;
            const newToBalance = toWallet.balance + amount;

            await tx.wallet.update({where :{userId : fromUserId},data : {balance : newFromBalance}});
            await tx.wallet.update({where : {userId : toUserId},data : {balance: newToBalance}});

            //create transaction for both wallets
            const debitTxn = await tx.transaction.create({
                data : {
                    amount,
                type : 'CREDIT',
                description : description || `Transfer to ${toUserId}`,
                walletId : fromWallet.id,
                },
            });
            const creditTxn = await tx.transaction.create({
                data : {
                    amount,
                    type : 'DEBIT',
                    description : description || `Transfer from ${fromUserId}`,
                    walletId : toWallet.id,
                },
            });
            return {
                from : {walletId : fromWallet.id,balance : newFromBalance,txn: debitTxn},
                to : {walletId : toWallet.id,balance: newToBalance,txn : creditTxn},
            };
        });
        return res.status(201).json({transfer : result});
    }catch (err){
        console.error('transfer error',err);
        if(err.message==='FROM_WALLET_NOT_FOUND' || err.message==='TO_WALLET_NOT_FOUND')return res.status(404).json({message : 'wallet not found'});
        if(err.message==='INSUFICIENT_FUNDS')return res.status(400).json({message : 'Insuficient funds'});
        return res.status(500).json({message : 'server error'});
    }
};


