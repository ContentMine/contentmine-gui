var express = require('express');
var router = express.Router();

var ExecCmd = require('../working/exec-cmd.js');

/* GET results of _exec code. */
router.get('/', function(req, res, next) {
    var execCmd = new ExecCmd();
    execCmd.exec('dir C:\\', function(results) {
        res.send('Command output was: ' + results);
    });
});

module.exports = router;
