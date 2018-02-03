

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
var { ObjectID } = require("mongodb");

const keys = require('./server/config/keys');
const { Todo } = require('./server/models/todo');
mongoose.connect(keys.mongoURL);

const app = express();
app.use(bodyParser.json());



app.get('/todos', async (req, res) => {
    try{
        var todoList = await Todo.find();
        if(todoList){
            res.send({todoList});
        }
    }catch(e){
        res.status(400).send(e.message);
    }
});

app.get('/todos/:id', async (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    try{
        var todo = await Todo.findById(id)
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }catch(e){
        res.status(404).send(e);
    }

});

app.post('/todos',  async (req, res) => {
    try{
        var todo = new Todo(req.body);
        var newTodo = await todo.save();
        if(newTodo){
            res.send(newTodo);
        }
    }catch(e){
        res.status(400).send(e.message);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('---------running--------');
});