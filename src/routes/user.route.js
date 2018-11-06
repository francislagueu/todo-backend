const router = require('express').Router();
const  UserCtrl = require('../controllers/user.controller');
const Validation = require('../middlewares/validation.middleware');

router.route('/register').post(Validation.Register,UserCtrl.Register);

router.route('/login').post(UserCtrl.Login);

module.exports = router;