const mongoDB = require('mongoose');
const todoSchema = mongoDB.Schema({
    text: {type: String},
    isCompleted: {type: Boolean}
});

module.exports = mongoDB.model('todos',todoSchema);