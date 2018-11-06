const router = require('express').Router({mergeParams: true});
const ItemCtrl = require('../controllers/item.controller');

router.route('')
        .get(ItemCtrl.GetAllItems)
        .post(ItemCtrl.CreateItem);

router.route('/:itemId')
        .get(ItemCtrl.GetOneItem)
        .put(ItemCtrl.UpdateItem)
        .delete(ItemCtrl.DeleteItem);

module.exports = router;