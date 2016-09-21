var express = require('express');
var app = express();
var router = express.Router();
var api = require('../working/api');

router.post('/api/cmd', api.cmd);

module.exports = router;