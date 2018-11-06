const mongoose = require('mongoose');

module.exports = async () => { 
    await mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true, useCreateIndex: true});
    mongoose.Promise = global.Promise;
    console.log('Database connected...')
}