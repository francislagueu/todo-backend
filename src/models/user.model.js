const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'The first name cannot be empty',
        trim: true
    },
    last_name: {
        type: String,
        required: 'The last name cannot be empty',
        trim: true
    },
    username: {
        type: String,
        required: 'The username cannot be empty',
        unique: true
    },
    email: {
        type: String,
        required: 'The email cannot be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'The password cannot be empty'
    }

}, {timestamps: true});
UserSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.comparePassword = async function(pass){
    return await bcrypt.compareSync(pass, this.password);
}

UserSchema.methods.response = async function() {
    const {username, email, first_name, last_name} = this;
    const response = {};
    response.username = username;
    response.email = email;
    response.first_name = first_name;
    response.last_name = last_name;
    return response;
}

module.exports = mongoose.model('User', UserSchema);