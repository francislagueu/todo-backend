const cors = require('cors');
const volleyball = require('volleyball');

module.exports = (app, express) => {
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(volleyball);
    app.use(cors());
}