import { validationResult } from 'express-validator';
import User from '../models/user.js';
import { createUser } from '../services/user.services.js';
import BlackToken from '../models/blackTokens.js';
export async function registerUser(req, res) {
   const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password } = req.body;
    const hashedPassword = User.hashPassword(password);

    const user = await createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken();
    res.cookie('token', token, );
    res.status(201).json({ user, token });
}
export async function loginUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'invalid username or password' });
    }
    const ismatch =user.comparePassword(password);
    if (!ismatch) {
        return res.status(401).json({ message: 'invalid username or password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token );
    res.status(200).json({ user, token });
}

export async function getuserProfile(req,res){
    res.status(200).json({user:req.user});
}

export async function logoutUser(req,res){
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return res.status(400).json({message:'No token provided'});
    }
    await BlackToken.create({token});
    res.clearCookie('token');

    
    res.status(200).json({message:'Logged out successfully'});
}