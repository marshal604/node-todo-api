const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

const id = '5acb627dc7cbfb33fbe82581';

// 驗證id
if (!ObjectID.isValid(id)) {
    return console.log('id is not valid');
}

Todo.remove({
    _id: id
}).then(doc => {
    if (doc.length === 0) {
        return console.log('data not found');
    }
    console.log('remove success\n', doc);
}).catch(e => {
    console.log('Unable to connect to server');
});

Todo.findOneAndRemove({
    _id: id
}).then(doc => {
    if (!doc) {
        return console.log('data not found');
    }
    console.log('remove success\n', doc);
}).catch(e => {
    console.log('Unable to connect to server');
});
Todo.findByIdAndRemove(id).then(doc => {
    if (!doc) {
        return console.log('data not found');
    }
    console.log('remove success\n', doc);
}).catch(e => {
    console.log('Unable to connect to server');
});