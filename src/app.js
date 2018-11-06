require('dotenv').config();

const Connection = require('./database/connection');
const Server = require('./server/server');

Connection();
Server();