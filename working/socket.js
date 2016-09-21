// Socket.IO on connection function.

module.exports =
function (socket) {



    // Console log connection detected.
    console.log('Socket.IO: Connection detected.');



    // Emit connection acknowledgement.
    socket.emit('connectionAcknowledgement', { connectedTime: Date.now() });



    // Command execution.

    // Variables.
    var execCmd = require('../working/exec-cmd');
    var dspl = require('../working/display-output').display;

    // Command exec.
    socket.on('cmd:Exec', function (data) {

        execCmd.exec(data.command, function(results) {

            //console.log(results);
            socket.emit('cmd:ExecFinished', dspl(results));

            //next();

        });

    });

    // Command  spawn.
    socket.on('cmd:Spawn', function (data) {

        var events = execCmd.spawn(data.command);

        events.on('dataOut', function (results) {

            //console.log(results);
            socket.emit('cmd:SpawnFinished', dspl(results));

        });

    });



};