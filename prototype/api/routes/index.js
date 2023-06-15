var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/weather', (req, res) => {
  res.render('weather');
});


module.exports = router;
