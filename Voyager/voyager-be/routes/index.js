var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/temp', function(req, res, next) {
  res.render('temp');
});

module.exports = router;
