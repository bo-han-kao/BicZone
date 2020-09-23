var express = require('express');
var router = express.Router();
const fs = require('fs');
const axios = require('axios').default;
// middleware程式碼，這樣才能抓倒頁面資料
router.use(express.urlencoded({
  extended: false
}));


router.use(express.json());
// router.get('/', function(req, res, next) {
//     var scandata = require('../scandata.json');
//     var device=scandata.payload.devices
//     console.log(device);
//     res.render('scan',{
//       devices:device,
//     });
//   });



router.get('/', async (req, res)=>{
  const response = await (await axios.get('http://127.0.0.1:5000/v1/mesh/scan')).data;
  var devices=response.payload.devices
  console.log(devices.length);
  res.render('scan', {
    devices: devices,
  });
});

router.get('/get-data', async (req, res)=>{
  const response = await (await axios.get('http://127.0.0.1:5000/v1/mesh/scan')).data;
  var devices=response.payload.devices
  console.log(devices.length);
  res.send(devices);
});


module.exports = router;
