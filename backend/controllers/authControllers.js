const User = require('../models/User');
const bcrypt = require('bcrypt');
const e = require('express');
const jwt = require('jsonwebtoken');

//register a new user
const registerUser = async (req, res) =>{
    const {email, password, name , country } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email, password:hashedPassword, name, country 
        });
        await newUser.save();
        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:'10days'})
        res.status(201).json({
            user:{
                id:newUser._id, 
                email:newUser.email,
                name:newUser.name,
                country:newUser.country,
                token
            }
            ,
            message:'user registered successfully'
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({message:'Internal server error' || error.message});
    }
}

const LoginUser = async (req, res)=>{
    try {
        const {email, password} =req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message:'User does not exist'});
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message:'Invalid credentials'});
        }
        const token = jwt.sign({id: existingUser._id},process.env.JWT_SECRET, {expiresIn:'10days'});
        res.status(200).json({
            message:'Login successful',
            user:{
                id:existingUser._id,
                email:existingUser.email,
                name:existingUser.name,
                country:existingUser.country,
                token
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({message:'Internal server error' || error.message});
        
    }

}

module.exports = {registerUser, LoginUser};