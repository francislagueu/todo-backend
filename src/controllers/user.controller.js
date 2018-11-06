const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user.model');
const httpStatus = require('http-status');

module.exports = {
    Register: async (req, res, next) => {
        try{
            const {username} = req.body;
            const result = await User.findOne({username}).exec();
            if(result){
                return next(null, false, {message: 'User already exist!!!'});
            }
            var user = await User.create(req.body);
            user = await user.response();
            res.status(httpStatus.CREATED).json({user});

        }catch(err){
            next(err);
        }
    },
    Login: async (req, res, next) => {
        passport.authenticate('local', {session: false}, (err, user,info)=>{
            try{
                if(err || !user){
                    const er = new Error('An error occured!!!!');
                    //error.status = httpStatus.EXPECTATION_FAILED;
                    return next(er);
                }
                req.login(user, {session: false}, async(error)=>{
                    if(error){
                        return next(error);
                    }
                    const {_id, username, email, first_name, last_name} = user;
                    const data = {_id, username, email, first_name, last_name};
                    const token = await jwt.sign({data}, process.env.SECRET,{expiresIn: '1d'});
                    return res.status(httpStatus.OK).json({data, token});
                });
            }catch(error){
                next(error);
            }
        })(req, res);
    }

}