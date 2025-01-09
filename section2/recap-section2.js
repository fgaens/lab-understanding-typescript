/*
 * Do math with union calculation type
 */
function calculateV1(input1, input2, calculationType) {
    var result;
    if (calculationType === 'SUM') {
        result = input1 + input2;
    }
    else {
        result = input1 - input2;
    }
    return result;
}
console.log('Do math with union calculation type');
console.log(calculateV1(10, 5, 'SUM'));
console.log(calculateV1(10, 5, 'SUBSTRACT'));
function calculateV2(input1, input2, calculationType) {
    var result;
    if (calculationType === 'SUM') {
        result = input1 + input2;
    }
    else {
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
var CalculationType;
(function (CalculationType) {
    CalculationType[CalculationType["SUM"] = 0] = "SUM";
    CalculationType[CalculationType["SUBSTRACT"] = 1] = "SUBSTRACT";
})(CalculationType || (CalculationType = {}));
function calculateV3(input1, input2, calculationType) {
    var result;
    if (calculationType === CalculationType.SUM) {
        result = input1 + input2;
    }
    else {
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
function calculateV4(input1, input2, calculationType, callbackFunction) {
    var result;
    if (calculationType === CalculationType.SUM) {
        result = input1 + input2;
    }
    else {
        result = input1 - input2;
    }
    callbackFunction(result);
}
console.log('Do math with enum calculation type and callback function');
calculateV4(10, 5, CalculationType.SUM, function (result) {
    console.log(result);
});
calculateV4(10, 5, CalculationType.SUBSTRACT, function (result) {
    console.log(result);
});
/*
 * Do math with function types
 */
function add(input1, input2) {
    return input1 + input2;
}
function substract(input1, input2) {
    return input1 - input2;
}
function log(message) {
    console.log(message);
}
var functionVar;
console.log('Do math with function types');
functionVar = add;
console.log(functionVar(10, 5));
functionVar = substract;
console.log(functionVar(10, 5));
// functionVar = log;   --> NOT POSSIBLE BECAUSE FUNCTION BLUEPRINT DOES NOT MATCH
