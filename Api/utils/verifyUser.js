import jwt from 'jsonwebtoken';
import { errorHandler} from './error.js'
export const verifyUser = (req,res, next) => {
    console.log("All cookies received:", req.cookies); // Debugging line to log all cookiesconst token = req.cookies['access token']; // Corrected to match the actual cookie nameconst token = req.cookies['access token']; // Corrected to match the actual cookie nameconst token = req.cookies['access token']; // Corrected to match the actual cookie nameconst token = req.cookies['access token']; // Corrected to match the actual cookie name
    const token = req.cookies['access_token'] || req.cookies['access token'];; // Corrected to match the actual cookie name
    console.log("Token received:", token); // Debugging line
   
    if(!token){
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if(err) {
              console.error("JWT verification error:", err.message); // Debugging line
            return next(errorHandler(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    });

} ;