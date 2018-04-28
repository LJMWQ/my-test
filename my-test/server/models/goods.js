var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var goodsSchema = new Schema({
    "cityName": {type: String},
    "data": [
        {
            "cityName": String,
            "title": String,
            "location": String,
            "image": String,
            "grade": String,
            "price": String
        }
    ]
});

module.exports = mongoose.model('goods', goodsSchema);