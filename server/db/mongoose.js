const mongoose = require('mongoose');

/* just polyfill promise , because I want use */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
}