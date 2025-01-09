var userInput;
var userName;
userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, errorCode) {
    throw { message: message, errorCode: errorCode };
}
generateError('An error occurred', 500);
generateError('Another error occured', 500);
