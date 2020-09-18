var express = require('express');
var router = express.Router();
// 使用firebase資料庫
var firebase = require('firebase');
// var db = firebase.database();
firebase.initializeApp({
  databaseURL: "https://testtodo-b43ca.firebaseio.com/"
});


// middleware程式碼，這樣才能抓倒頁面資料
router.use(express.urlencoded({
  extended: false
}));


router.use(express.json());

// 測試頁面
router.get('/', function (req, res, next) {
  var db = firebase.database();

  db.ref('todos').once('value', function (inputdata) {
    var data = inputdata.val();
    console.log(data);
    res.render('crudtest', {
      "listdata": data
    });
  });

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
    db.ref('todos').once('value', function (inputdata) {
      // res.send(snapshot.val())
      // console.log(inputdata.val());
    })
  });

  // res.redirect(‘/’)完成後跳轉頁面
  res.redirect('/crudtest');
})


router.post('/update-item', function (req, res) {
  console.log(req.body.text)
  var db = firebase.database();
  var id = req.body.id;
  // console.log(id);
  var dbRef = db.ref('todos/' + id);
  dbRef.update({
    item: req.body.text
  });
  res.send("更新成功")
});

router.post('/delete-item', function (req, res) {
  var db = firebase.database();
  var id = req.body.id
  var dbRef = db.ref('todos/' + id)
  dbRef.remove();
  res.send("Delete Success")
  });

module.exports = router;