var utf8 = require('utf8');

// Tools for handling the displaying of the command output.
var displayOutput = {};

// Variables.
var custRtn = '8cb27789-3152-46fd-95ec-46a80312fdf0';

// Export items:

// Custom "return character".
displayOutput.rtn = custRtn;

// A method that takes command output and displays it nicely in HTML.
displayOutput.display = function display(text) {
    var textFormatted = "";
    if (typeof(text) === 'string') {
        textFormatted = text;
        textFormatted = toUtf8(textFormatted);
        textFormatted = escapeHtml(textFormatted);
        textFormatted = setCustomReturns(textFormatted);
        textFormatted = setReturns(textFormatted);
    } else {
        textFormatted = 'ContentMine Error: Input to displayOutput was not a string.';
    }
    return textFormatted;
};

// Helpers. ------------------------------------------------------------------------------------------------------------

function toUtf8(text) {
    return utf8.encode(text);
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function setReturns(text) {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
}

function setCustomReturns(text) {
    var re = new RegExp(custRtn, 'g');
    return text.replace(re, '<br />');
}

// ---------------------------------------------------------------------------------------------------------------------

// Export.
module.exports = displayOutput;