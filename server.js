const express = require('express');
// mustache tags{Logic-less templates}.
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./database/todo');

//connect to mLab database
mongoose.connect('mongodb://firask89:551052612f@ds115664.mlab.com:15664/items').then(function () {
    console.log('Connected to database.');
})

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// to connect style.css with index.mustach
app.use(express.static(__dirname + '/views/public'));

//view engine
const mustacheInstance = mustache();
//to not reload the server on every change
mustacheInstance.cache = null;
app.engine('mustache', mustacheInstance);
//set our view engine to mustache

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    //give everything in GET
    Todo.find({}).then(function (results) {
        res.render('index', { todos: results });
    })
});

//post everything from "form" body
app.post('/todos', function (req, res) {
    let newTodo = new Todo({ content: req.body.content });
    // save to data base
    newTodo.save()
        //use promise to deal with the data 
        .then(function (data) {
            console.log(data);
            //after save on data base back to the main page (hang)
            res.redirect('/');
        })
        //handle the errors :
        //if you try to store empty object it will not go to DB
        // and it will return you back to the main page
        .catch(function (err) {
            console.log(err);
            res.redirect('/');
        })
});
//delete an item from database by id 
app.post('/todos/:id/deleted', (req, res) => {
    Todo.collection.deleteOne(req.body.id);
    res.redirect('/');
});

// app.delete('/todos/:id', (req, res) => {
//     let newTodo = new Todo({ content: req.body.id });
//     newTodo.collection('todos').remove({ _id: req.body.id }, (err, result) => {
//         if (err) return console.log(err)
//         console.log(req.body)
//         res.redirect('/')
//     })
// })

// app.delete('/todos', function (req, res) {
//     var id = req.params.id;
//     var collection = Todo.get().collection('menu');

//     collection.deleteOne({ _id: new mongo.ObjectId(id) }, function (err, results) {
//     });

//     res.json({ success: id })
// });


var port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('listening to port 3000');
});