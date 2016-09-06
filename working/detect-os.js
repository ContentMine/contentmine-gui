/**
 * The value to be exported, the OS name, one of:
 * 'Windows'
 * 'Linux'
 * 'Mac'
 */

var Os = detectOs();

// Helpers. ------------------------------------------------------------------------------------------------------------

// A method for detecting the OS the server is to run on.
function detectOs() {
    var Os = undefined;
    switch (process.platform) {
        case 'linux':   // Linux
            Os = 'Linux';
            break;
        case 'darwin':  // Mac
            Os = 'Mac';
            break;
        case 'win32':   // Windows
            Os = 'Windows';
            break;
        case 'freebsd':
        case 'sunos':
        default:
            // Throw an error otherwise.
            throw "The operating systems FreeBSD and SunOS are not supported.";
    }
    return Os;
}

// ---------------------------------------------------------------------------------------------------------------------

// Export.
module.exports = Os;