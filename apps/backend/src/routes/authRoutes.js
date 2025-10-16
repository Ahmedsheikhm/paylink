import express from 'express';
import { register,login } from '../controllers/authController.js';
import { validateBody } from '../middleware/validate.js';
import { registerSchema,loginSchema } from '../validation/auth.schema.js';

const route = express.Router();

route.post('/register',validateBody(registerSchema),register);
route.post('/login',validateBody(loginSchema),login);

export default route;