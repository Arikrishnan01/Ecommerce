import JWT from "jsonwebtoken";
import UserModel from '../Models/userModel.js';

/** PROTECTED THE ROUTES */
export const requireSignIn = async(req, res, next) => {
    try{
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    }
    catch(error){
        console.log(error);
    }
}

/** ADMIN ACCESS */
export const isAdmin = async(req, res, next) => {
    try{
        const user = await UserModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access!!"
            });
        }
        else{
            next();
        }
    }
    catch(error){
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in admin access",
            error: error.message
        });
    }
}