var express = require('express');
var router = express.Router();

// 測試頁面
router.get('/', function(req, res, next) {
  res.render('scene');
});

module.exports = router;