var express = require('express');
var router = express.Router();
// 使用firebase資料庫
var firebase = require('firebase');
// var db = firebase.database();
firebase.initializeApp({
  databaseURL: "https://testtodo-b43ca.firebaseio.com/"
});


// iddleware程式碼，這樣才能抓倒頁面資料
router.use(express.urlencoded({
  extended: false
}));
// 測試頁面
router.get('/', function (req, res, next) {
  res.render('crudtest');
  // var db = firebase.database();
  console.log(db)
});


router.post('/create-item', function (req, res) {
  var item = req.body.item;
  var db = firebase.database();
  // 創建名為todos的檔案夾
  var itemRef = db.ref('todos').push();
  // 存入todos檔案夾的資料
  itemRef.set({
    "item": item
  }).then(function () {
    db.ref('todos').once('value', function (snapshot) {
      // res.send(snapshot.val())
    })
  });

  // res.redirect(‘/’)完成後跳轉頁面
  res.redirect('/crudtest');
})

module.exports = router;