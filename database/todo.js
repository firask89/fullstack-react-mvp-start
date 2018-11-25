const mongoose = require('mongoose');
//describe what we want to send to mongo
const Schema = mongoose.Schema;

let todoSchema = new Schema({
    content: {
        //cannot be empty 
        type: String,
        required: true
    }
    // succses: {
    //     //add default value 
    //     type: Boolean,
    //     default: false
    // }

});
//create a model from mongo to handle data 
module.exports = mongoose.model('Todo', todoSchema);