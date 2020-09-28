var express = require('express');
var router = express.Router();
const fs = require('fs');

const multer = require('multer');
var upload = multer();


router.get('/', function (req, res, next) {
  res.render('upload');
});

router.post('/',upload.array(), function (req, res, next) {
  let formData = req.body;
  console.log(formData);
  // res.status(200).send(formData);
});

module.exports = router;
