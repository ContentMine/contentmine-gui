var _exec = require('child_process').exec;
var rtn = require('./display-output').rtn;
var os = require('./detect-os');
var _spawn = undefined; // Fixing the issue of the spawn method not working correctly on Windows below.
if (os === 'Windows') {
    _spawn = require('cross-spawn');
} else {
    _spawn = require('child_process').spawn;
}

// A helper set of methods for various child process command executions.
var execCmd = {};

// Variables.
var errTextStdNote = 'ContentMine Error: ';
var errTextCmdEx = 'Error in command execution.';
var errTextErrDets = 'Error details:';
var errTextCmdErrOut = 'Command\'s error output:';

// Export items:

// Simple exec method.
execCmd.exec = function(cmd, funcToRun) {
    _exec(cmd, { encoding: 'utf8' }, function (error, stdout, stderr) {
        // Command output is in stdout.
        var results = "";
        if(error !== null) {
            results +=
                errTextStdNote + errTextCmdEx + rtn +
                errTextErrDets + rtn +
                JSON.stringify(error) + '' + rtn;
            if (typeof(stderr) === 'string' && stderr !== '') {
                results +=
                    errTextCmdErrOut + rtn +
                    stderr;
            } else {
                results +=
                    'Additional error details:' + rtn +
                    JSON.stringify(stderr);
            }
        } else {
            if (typeof(stdout) === 'string') {
                if (stdout !== '') {
                    results += stdout;
                } else {
                    results += 'Command returned empty output.';
                }
            } else {
                results +=
                    'Command returned the non-string:' + rtn +
                    JSON.stringify(stdout);
            }
        }
        if (typeof(results) === 'string') {
            // No action.
        } else {
            results =
                errTextStdNote + 'Failed to interpret the command output, which was:' + rtn +
                JSON.stringify(results);
        }
        funcToRun(results);
    });
};

// Spawn method, potentially more powerful.
execCmd.spawn = function(cmd, funcToRun) {
    var spawnee = _spawn(cmd);
    var results = '';
    var results_stderr = '';
    spawnee.stdout.on('data', function (data) {
        if (typeof(data) === 'string') {
            results += data;
        } else {
            results += data.toString();
        }
    });
    spawnee.stderr.on('data', function (data) {
        if (typeof(data) === 'string') {
            results_stderr += data;
        } else {
            results_stderr += data.toString();
        }
    });
    spawnee.on('close', function (code) {
        if (code !== 0) {
            if (results_stderr !== '') {
                results +=
                    errTextStdNote + errTextCmdEx + rtn +
                    'Command\'s error code: ' + code + rtn +
                    errTextCmdErrOut + rtn +
                    results_stderr;
            }
            funcToRun(results);
        } else {
            if (results_stderr !== '') {
                results +=
                    errTextStdNote + errTextCmdEx + rtn +
                    errTextCmdErrOut + rtn +
                    results_stderr;
            }
            funcToRun(results);
        }
    });
    spawnee.on('error', function(err){
        results +=
            errTextStdNote + errTextCmdEx + rtn +
            JSON.stringify(err);
        funcToRun(results);
    });
};

// Export.
module.exports = execCmd;