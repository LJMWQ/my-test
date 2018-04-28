var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    "userName": String,
    "passWord": String,
    "userId": String
});

module.exports = mongoose.model('Users', userSchema);