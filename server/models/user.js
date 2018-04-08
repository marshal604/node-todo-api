const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        required: true
    },
    name: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    age: {
        type: Number,
        trim: true,
        minlength: 1,
        required: true
    }
});
const User = mongoose.model('Users', userSchema);


/* sample */
// const newUser = new User({
//     email: 'yur@example.com',
//     password: '123abc',
//     name: 'YUR',
//     age: 25
// });
// newUser.save().then(doc => {
//     console.log('Success to save user data:', doc);
// }).catch(err => {
//     console.log('Unable to save user data:', err);
// });

module.exports = {
    User
}
