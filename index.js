

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const keys = require('./server/config/keys');
const { Todo } = require('./server/models/todo');
mongoose.connect(keys.mongoURL);

const app = express();
app.use(bodyParser.json());

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