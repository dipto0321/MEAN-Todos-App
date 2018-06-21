const express = require('express');
const router = express.Router();
const todosList = require('../models/dbSchema');


//Api methods

// Create New Data
router.post('/todo', (req, res, next) => {
    var newTodo = new todosList({
        text:req.body.text,
        isCompleted:req.body.isCompleted
    });

    newTodo.save((err, _todo) => {
        if (err) {
            res.status(500).json({ "ERROR": "Invalid Data",errmsg: err });
        } else {
            res.status(200).json(_todo);
        }
    });
});

// Get All data
router.get('/todo', (req, res, next) => {
    todosList.find({}, (err, _todos) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        } else {
            res.status(200).json(_todos);
        }
    });
});

// Get Single data
router.get('/todo/:id', (req, res, next) => {
    todosList.find({
        _id: req.params.id
    }, (err, _todos) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        } else {
            res.status(200).json(_todos);
        }
    });
});

//Update Specific data
router.put('/todo', (req, res, next) => {
    todosList.findById(req.body._id, (err, _todo) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        } else {
            _todo.text = req.body.text;
            _todo.isCompleted = req.body.isCompleted;
            _todo.save(() => {
                if (err) {
                    res.status(500).json({ "ERROR": "Invalid Data",errmsg: err });
                } else {
                    res.status(200).json(_todo);
                }
            });
        }
    });
});

//Remove data
router.delete('/todo/:id', (req, res, next) => {
    todosList.findOneAndRemove({ _id: req.params.id }, (err, _todo) => {
        if(err){
            res.status(500).json({ errmsg: err });
        }else{
            res.status(200).json(_todo);
        }
    });
});

module.exports = router;