const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URL = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URL = 'mongodb://localhost:27017/TodoAppTest';
}

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');
const _ = require('lodash');

const app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({
            errorMsg: 'your id is not valid'
        })
    }
    Todo.findByIdAndRemove(id).then(doc => {
        if (!doc) {
            return res.status(404).send({
                errorMsg: 'not found data by your id'
            });
        }
        res.send(doc);
    }).catch(e => res.status(404).send('Unable to connect to DB'));
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send({
            errorMsg: 'your id is not valid'
        })
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(doc => {
        if (!doc) {
            return res.status(404).send({
                errorMsg: 'not found data by your id'
            });
        }
        res.send(doc);
    }).catch(e => res.status(404).send('Unable to connect to DB'));
});

app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
});

module.exports = {
    app
}