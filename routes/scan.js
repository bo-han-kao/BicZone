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



// router.get('/', async (req, res)=>{
//   const response = await (await axios.get('http://127.0.0.1:5000/v1/mesh/scan')).data;
//   var devices=response.payload.devices
//   console.log(devices.length);
//   res.render('scan', {
//     devices: devices,
//   });
// });



router.get('/', async (req, res) => {
  // 假資料測試用
  // const response = await (await axios.get('http://localhost:8000/mesh/scan/get-data')).data;
  // const response = await (await axios.get('http://localhost:5000/v1/mesh/scan')).data;
  res.render('scan',{
    // devices: response.devices,
  });
});

router.get('/get-data', (req, res) => {
  try {
    const scandata = JSON.parse(fs.readFileSync('./scandata.json', { encoding: 'utf-8' }));
    res.status(200).send({ devices: scandata.payload.devices });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error }).end();
  }
});


module.exports = router;
