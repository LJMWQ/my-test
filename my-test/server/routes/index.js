var express = require('express');
var router = express.Router();

// var goodsData = require('../../mock/goods.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(goodsData);
  // res.json(goodsData);
  res.send('this is route');
});

// router.get('/goods', function(req, res, next){
//   // res.end()只能输出字符串
  
//   res.json(goodsData);
// })

module.exports = router;
