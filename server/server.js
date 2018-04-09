const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();
const port = process.env.PORT || 3000;

// use bodyParser to encode json
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        res.send(doc);
    }).catch(err => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    // vertify id is valid
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({
            errorMsg: 'your id is not valid'
        });
    }

    Todo.findById(id).then(doc => {
        if (!doc) {
            return res.status(404).send({
                errorMsg: 'not found data by your id'
            });
        }
        res.send(doc);
    }).catch(e => {
        res.status(404).send({
            errorMsg: 'Unable to connect to DB'
        });
    });
});

app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
});

module.exports = {
    app
}