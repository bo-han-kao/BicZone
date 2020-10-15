var express = require('express');
var router = express.Router();
router.use(express.static(__dirname + "/public"));
// 測試頁面
router.get('/', function(req, res, next) {
  res.render('device');
});

module.exports = router;