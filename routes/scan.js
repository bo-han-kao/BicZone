var express = require('express');
var router = express.Router();

// middleware程式碼，這樣才能抓倒頁面資料
router.use(express.urlencoded({
    extended: false
  }));
  
  
  router.use(express.json());




router.get('/', function(req, res, next) {
    var scandata = require('../scandata.json');
    var device=scandata.payload.devices
    console.log(device);
    res.render('scan',{
      devices:device,
    });
  });





module.exports = router;
