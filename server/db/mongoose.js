const mongoose = require('mongoose');

/* just polyfill promise , because I want use */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL);

module.exports = {
    mongoose
}