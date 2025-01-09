let userInput: unknown
let userName: string

userInput = 5;
userInput = 'Max';

if (typeof userInput === 'string') {
    userName = userInput;
}

function generateError(message: string, errorCode: number): never {
    throw { message: message, errorCode: errorCode }
}

generateError('An error occurred', 500);
generateError('Another error occured', 500);