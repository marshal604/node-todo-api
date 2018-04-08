const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

const id = '5aca392de6480d27b6583601';

Todo.find({
    _id: id
}).then(doc => {
    if (doc.length === 0) {
        return console.log('data not found');
    }
    console.log('Todo.find\n', doc);
}).catch(e => {
    console.log('Unable to connect to server');
});

Todo.findOne({
    _id: id
}).then(doc => {
    if (!doc) {
        return console.log('data not found');
    }
    console.log('Todo.findOne\n', doc);
}).catch(e => {
    console.log('Unable to connect to server');
});
Todo.findById(id).then(doc => {
    if (!doc) {
        return console.log('data not found');
    }
    console.log('Todo.findById\n', doc);
}).catch(e => {
    console.log('Unable to connect to server');
});