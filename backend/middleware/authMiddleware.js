const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            req.userId = decoded.id;
            const user = await User.findById(req.userId).select('-password');
            if(!user){
                return res.status(401).json({message:'Not authorized, user not found'});
            }
        next();
            
        } catch (error) {
            console.error('Error in authMiddleware:', error);
            return res.status(401).json({message:'Not authorized, token failed'});
            
        }

    }
    return res.status(401).json({message:'Not authorized, no token provided'});
}

module.exports = authMiddleware;