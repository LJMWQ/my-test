var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// Goods是mongoose的模型
var citypages = require('../models/citypages');

mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function () {
    console.log('city db success');
});

mongoose.connection.on('error', function () {
    console.log('connection fail');
});

mongoose.connection.on('disconnected', function () {
    console.log('db connected failllll');
});


/* GET home page. */
router.get('/', function(req, res, next) {
  // Goods.find({查找条件}, (err, doc){})    doc 是返回的文档

  

  citypages.find({}, function (err, doc) {
      console.log(doc, 'dododood');
      if (err) {
          res.json({
              status: '1',
              msg: err.message
          });
      } else {
          res.json({
              status: '0',
              msg: '',
              result: {
                  count: doc.length,
                  list: doc
              }
          })
      }
  })
});

// router.get('/goods', function(req, res, next){
//   // res.end()只能输出字符串
  
//   res.json(goodsData);
// })

module.exports = router;
