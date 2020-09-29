var express = require('express');
var router = express.Router();
const fs = require('fs');

const multer = require('multer');
var upload = multer();


router.get('/', function (req, res, next) {
  res.render('upload');
});

router.post('/',upload.array('file'), function (req, res, next) {
  let formData = req.files;
  console.log(formData);
  
});

module.exports = router;
