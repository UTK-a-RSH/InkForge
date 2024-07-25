import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'


export const test = (req, res) => {
    res.json({message : 'API is working well'})
};


export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId ){
        return next(errorHandler(403, 'Updation is not allowed'));
    }
    if(req.body.password){
        if(req.body.passowrd.length < 6){
            return next(errorHandler(400, 'Password must be of atleast 6 characters'));
        }

        req.body.password = bcryptjs.hashSync(req.body.passowrd, 10);

    }

    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20 ){
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
        }

        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        
        if(req.body.username != req.body.username.toLowerCase()){
            return next(errorHandler(400, 'Username must be lowercase'));
        }

        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'Username can only contain letters and numbers'));
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set : {
                    username : req.body.username,
                    email : req.body.email,
                    passowrd: req.body.password,
                    profilePicture : req.body.profilePicture,
                },
            },
            {new : true}
        
        );

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
        } catch (error) {
            return next(error);
        }
    }

};