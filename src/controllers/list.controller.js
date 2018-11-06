const httpStatus = require('http-status');
const List = require('../models/list.model');

module.exports = {
    GetAllList: async (req, res, next) =>{
        try{
            const lists = await List.find({}).populate('user','-password').populate('items').exec();
            return res.status(httpStatus.OK).json(lists);
        } catch(err){
            next(err);
        }
        
    },
    GetOneList: async (req, res, next) => {
        try {
            const {id} = req.params;
            const list = await List.findOne({_id: id}).populate('items').exec();
            return res.status(httpStatus.FOUND).json(list);
        } catch(err){
            next(err);
        }
    },
    CreateList: async (req, res, next) => {
        try{
            const {user} = req.user;
            const {name} = req.body;
            var list = await List.findOne({name}).exec();
           // console.log(list.user)
            console.log(req.user._id);
            if(list && (list.user === req.user._id)){
                return next(null, false, {message: 'A list with the same name already exist'});
            }
            list = new List();
            req.body.user = req.user;
            list = await List.create(req.body);
            return res.status(httpStatus.CREATED).json(list);
        }catch(err){
            next(err);
        }

    },
    UpdateList: async (req, res, next) => {
        try{
            const {id} = req.params;
            var list = await List.findById(id).exec();
            if(!list){
                return next(null, false, {message: 'List cannot be found...'});
            } 
            list = await List.findByIdAndUpdate(id, req.body);
            return res.status(httpStatus.OK).json(list);
        }catch(err){
            next(err);
        }
    },
    DeleteList: async (req, res, next) => {
        try{
            const {id} = req.params;
            var list = await List.findById(id).exec();
            if(!list){
                return next(null, false, {message: 'List cannot be found...'});
            }
             await List.findByIdAndRemove(id);
            return res.status(httpStatus.OK).json({message: 'List was successfully deleted'});
        }catch(err){
            next(err);
        }
    }
}