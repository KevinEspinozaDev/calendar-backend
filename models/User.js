const {Schema, model} = require('mongoose');

/*
Mongoose will automatically ignore all extra fields
not declared here.
*/
const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = model('User', UserSchema);