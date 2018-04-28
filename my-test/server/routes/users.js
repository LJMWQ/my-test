var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/users');

mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function () {
  console.log('db connected success');
});




router.get('/login', function(req, res, next) {
  // post方式用req.body取餐
  console.log(req);
  let param = {
    // userName: req.body.userName,
    // passWord: req.body.passWord
  };

  // 取到前端参数之后   用模型去数据库查找数据 findOne(params)根据params查找某一个用户
  User.findOne(param, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {//向cookie写数据
          path: '/',
          maxAge: 1000*60
        });
        res.cookie("userName", doc.userName, {//向cookie写数据
          path: '/',
          maxAge: 1000*60
        });
        //req.session.user = doc;//获取用户信息
        res.json({
          status: "0",
          msg: "",
          result:{
            userInfo: doc
          }
        })
      }
    }
  });
});

// 登出接口
router.get('/logout', function (req, res, next) {
  res.cookie("userId", "", {
    path: '/',
    // 让cookie失效
    maxAge: -1
  });
  // res往服务端写json
  res.json({
    status: '0',
    msg: '', 
    result: ''
  })
});

router.get('/other', function (req, res, next) {
  // res.cookie("userId", "", {
  //   path: '/',
  //   // 让cookie失效
  //   maxAge: -1
  // });
  // res往服务端写json
  res.json({
    status: '0',
    msg: '这个操作不行', 
    result: ''
  })
})

module.exports = router;
