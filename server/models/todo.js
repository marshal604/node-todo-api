const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* 定義DB欄位 */
const todoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        defualt: null
        // required: true
    }
});

// /* 定義我們的模組 */
const Todo = mongoose.model('Todos', todoSchema);

/* sample */

// const newTodo = new Todo({
//     text: 'take the bath',
//     completed: true
// });

// newTodo.save()
//     .then(doc => {
//         console.log('Success to save doc', doc);
//     }).catch(err => {
//         console.log('Unable to save data:', err);
//     });


module.exports = {
    Todo
}