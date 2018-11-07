const httpStatus = require('http-status');
const Item = require('../models/item.model');
const List = require('../models/list.model');

module.exports = {
    GetAllItems: async (req, res, next) => {
        try {
            //console.log(req);
            const {
                id
            } = req.params;
            const list = await List.findOne({
                _id: id
            }).exec();
            //console.log(list);
            const items = list.items;
            console.log(items);
            return res.status(httpStatus.OK).json(items);
        } catch (err) {
            next(err);
        }
    },
    GetOneItem: async (req, res, next) => {
        try {
            const {
                itemId
            } = req.params;
            const item = await Item.findById(itemId).exec();
            if (!item) {
                return next(null, false, {
                    message: 'Item cannot be found...'
                });
            }
            return res.status(httpStatus.FOUND).json(item);
        } catch (err) {
            next(err);
        }
    },
    CreateItem: async (req, res, next) => {
        try {
            const {
                id
            } = req.params;
            console.log(id);
            var list = new List();
            list = await List.findOne({
                _id: id
            }).exec();
            console.log(list);
            console.log(req.body);
            const item = await Item.create(req.body);
            console.log(item);
            list.items.push(item);
            await list.save();
            return res.status(httpStatus.OK).json(item);
        } catch (err) {
            next(err);
        }
    },
    UpdateItem: async (req, res, next) => {
        try {
            const {
                itemId
            } = req.params;
            var item = await Item.findById(itemId).exec();
            if (!item) {
                return next(null, false, {
                    message: 'Item cannot be found...'
                });
            }
            item = await Item.findByIdAndUpdate(itemId, req.body);
            return res.status(httpStatus.OK).json(item);
        } catch (err) {
            next(err);
        }
    },
    DeleteItem: async (req, res, next) => {
        try {
            const {
                id,
                itemId
            } = req.params;
            const list = await List.findById(id);
            var index = await list.items.indexOf(itemId);
            if (index > -1) {
                list.items.splice(index, 1);
                list.save();
            }
            await Item.findByIdAndRemove(itemId);
            res.status(httpStatus.OK).json({
                message: 'Item successfully removed...'
            });
        } catch (err) {
            next(err);
        }
    }
}