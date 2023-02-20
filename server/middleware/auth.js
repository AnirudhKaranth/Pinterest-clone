import jwt from 'jsonwebtoken'
import { createCustomError } from '../errors/CustomError.js'

const auth = async(req, res, next)=>{
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return next(createCustomError("Authentication Invalid", 401))
    }
    
    const token  = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.User = {userId: payload.userId}
        
        next();
    } catch (error) {
        next(error)
    }
}

export default auth