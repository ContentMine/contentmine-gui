/*
 * Command execution API.
 * DEPRECATED - Socket.IO now used.
 */

// The API object.
var api = {};

// Data
var data = {

};

// GET

// [...]

// POST

api.cmd = function (req, res) {


    var execCmd = require('exec-cmd');
    var dspl = require('display-output').display;

    execCmd.exec(req.body.command, function(results) {
        //res.json({commandOutput: results});
        console.log(results);
        res.send(dspl(results));
        //next();
    });

    //console.log("b");
    ///res = {};
    //res.send('done!');
};

// PUT

// [...]

// DELETE

// [...]

module.exports = api;