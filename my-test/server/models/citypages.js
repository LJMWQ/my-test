var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var citySchema = new Schema({
    "provinces": [
        {
            "citys": [
                {
                    "citysName" : String
                }
            ],
            "provinceName": String
        }
    ]
});

module.exports = mongoose.model('citypages', citySchema);