const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const {ExtractJwt} = require('passport-jwt');
const JWTStrategy  = require('passport-jwt').Strategy;
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');



passport.use( new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, next)=>{
    try{
        
        const user = await User.findOne({username}).exec();
    
        if(!user){
            return next(null, false, {message: `User doesn't exist!!!`});
        }
        
        const result = await user.comparePassword(password);
        
        if(!result){
            return next(null, false, {message: 'Wrong input password'});
        }
        return next(null, user, {message: 'You successfully logged in....'})
    } catch(err){
        next(err);
    }
}));

passport.use(new JWTStrategy({
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, next)=>{
    try{
        if(token.exp > Date.now()){
            return next(null, false, {message: 'Authentication token expired'});
        }
        return next(null, token.data);
    }catch(err){
        next(err);
    }
}))