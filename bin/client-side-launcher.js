/**
 * EVGENY SAVELIEV: CLIENT-SIDE LAUNCHER.
 * Requires first argument as the browser launching command (with {port} as the port placeholder), e.g:
 * node client-side-launcher "start http://localhost:{port}"
 */

var port = require('../bin/www');
var execCmd = require('../working/exec-cmd.js');

// process.argv[2] is the command passed to the launcher.
// port is the app port as set by /bin/www.
var argProvided = process.argv[2];
if (argProvided !== undefined) {
    if (argProvided.indexOf('{port}') !== -1) {
        execCmd.exec(argProvided.replace('{port}', port), function(results) { }); // No action.
    } else {
        console.log('Error: the browser launching command provided as the first argument to the client-side-launcher must contain {port} as the port placeholder.');
    }
} else {
    console.log('Error: must provide the browser launching command as the first argument to client-side-launcher (with {port} as the port placeholder).');
}