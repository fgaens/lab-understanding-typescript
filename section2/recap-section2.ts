/*
 * Do math with union calculation type
 */
function calculateV1(input1: number, input2: number, calculationType: 'SUM' | 'SUBSTRACT') {
    let result: number;

    if (calculationType === 'SUM') {
        result = input1 + input2;
    } else {
        result = input1 - input2;
    }

    return result;
}

console.log('Do math with union calculation type');
console.log(calculateV1(10, 5, 'SUM'));
console.log(calculateV1(10, 5, 'SUBSTRACT'));

/*
 * Do math with union type calculation type
 */
type CalculationDescriptor = 'SUM' | 'SUBSTRACT';

function calculateV2(input1: number, input2: number, calculationType: CalculationDescriptor) {
    let result: number;

    if (calculationType === 'SUM') {
        result = input1 + input2;
    } else {
        result = input1 - input2;
    }

    return result;
}

console.log('Do math with union type calculation type');
console.log(calculateV2(10, 5, 'SUM'));
console.log(calculateV2(10, 5, 'SUBSTRACT'));

/*
 * Do math with enum calculation type
 */
enum CalculationType {
    SUM,
    SUBSTRACT
}

function calculateV3(input1: number, input2: number, calculationType: CalculationType) {
    let result: number;

    if (calculationType === CalculationType.SUM) {
        result = input1 + input2;
    } else {
        result = input1 - input2;
    }

    return result;
}

console.log('Do math with enum calculation type');
console.log(calculateV3(10, 5, CalculationType.SUM));
console.log(calculateV3(10, 5, CalculationType.SUBSTRACT));

/*
 * Do math with enum calculation type and callback function
 */
function calculateV4(input1: number, input2: number, calculationType: CalculationType, callbackFunction: (result) => void) {
    let result: number;

    if (calculationType === CalculationType.SUM) {
        result = input1 + input2;
    } else {
        result = input1 - input2;
    }

    callbackFunction(result);
}

console.log('Do math with enum calculation type and callback function');
calculateV4(10, 5, CalculationType.SUM, (result) => {
    console.log(result);
});
calculateV4(10, 5, CalculationType.SUBSTRACT, (result) => {
    console.log(result);
});

/*
 * Do math with function types
 */
function add(input1: number, input2: number) {
    return input1 + input2;
}

function substract(input1: number, input2: number) {
    return input1 - input2;
}

function log(message: string) {
    console.log(message);
}

let functionVar: (i1: number, i2: number) => number;

console.log('Do math with function types');
functionVar = add;
console.log(functionVar(10, 5));

functionVar = substract;
console.log(functionVar(10, 5));

// functionVar = log;   --> NOT POSSIBLE BECAUSE FUNCTION BLUEPRINT DOES NOT MATCH