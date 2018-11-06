const router = require('express').Router();
const itemRoute = require('./item.route');
const passport = require('passport');
const ListCtrl = require('../controllers/list.controller');

router.route('')
        .get(passport.authenticate('jwt', {session: false}), ListCtrl.GetAllList)
        .post(passport.authenticate('jwt', {session: false}), ListCtrl.CreateList);

router.route('/:id')
        .get(passport.authenticate('jwt', {session: false}), ListCtrl.GetOneList)
        .put(passport.authenticate('jwt', {session: false}), ListCtrl.UpdateList)
        .delete(passport.authenticate('jwt', {session: false}), ListCtrl.DeleteList);

router.use('/:id/items',itemRoute);

module.exports = router;