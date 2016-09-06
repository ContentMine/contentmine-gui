var execCmd = require('./exec-cmd');

// A method which handles commands to be executed on the server.
function cmdHandler(req, res, next) {
    //res.setHeader('Content-Type', 'text/plain');
    //res.write('you posted:\n');
    //res.cmdHandler = JSON.stringify(req.body, null, 2);

    var formData =req.body;
    var cmd = formData.txtCommand;

    execCmd.exec(cmd, function(results) {
        res.commandOutput = results;
        next();
    });
}

// Export.
module.exports = cmdHandler;