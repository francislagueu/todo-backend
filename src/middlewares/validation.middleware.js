const Joi = require('joi');
const httpStatus = require('http-status');

module.exports = {
    Register(req, res, next){
        const userSchema = {
            username: Joi.string().min(4).max(32).required(),
            email: Joi.string().email().required(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,32}$/)
        };

        const {error, value} = Joi.validate(req.body, userSchema);

        if(error){
            switch(error.details[0].context.key){
                case 'email':
                    res.status(httpStatus.BAD_REQUEST).send({
                        error: 'You must provide a valid Email'
                    });
                    break;
                case 'username':
                    res.status(httpStatus.BAD_REQUEST).send({
                        error: 'You must provide a valid Username'
                    });
                    break;
                case 'first_name':
                    res.status(httpStatus.BAD_REQUEST).send({
                        error: 'You must provide a valid First Name'
                    });
                    break;
                case 'last_name':
                    res.status(httpStatus.BAD_REQUEST).send({
                        error: 'You must provide a valid Last Name'
                    });
                    break;
                case 'password': 
                    res.status(httpStatus.BAD_REQUEST).send({
                        error: `You must provide a Password that match the following rules:
                            <br>
                            1. It must contain ONLY lower case, upper case and numerics characters.
                            <br>
                            2. It must be between 6 and 32 characters in length
                        `
                    })
                    break;
                default:
                    res.status(httpStatus.BAD_REQUEST).send({
                        error: 'Invalid user information provided'
                    });
            }
        }else{
            next();
        }
    }
}
