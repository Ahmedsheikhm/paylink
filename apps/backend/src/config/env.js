import {cleanEnv,str,port,num} from 'envalid';

export default cleanEnv(process.env,{
    NODE_ENV: str({choices: ['development','test','production'],default:'development'}),
    PORT: port({default : 5000}),
    DATABASE_URL : str(),
    JWT_SECRET : str(),
    JWT_EXPIRES_IN: str({default: '7d'}),
    BCRYPT_SALT_ROUNDS: num({default : 10}),
    //optional
    TRUST_PROXY: str({default :''}),
});