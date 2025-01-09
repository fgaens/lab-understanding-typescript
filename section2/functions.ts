function add(n1: number, n2: number) {
    return n1 + n2;
}

function printResult(num: number): void {
    console.log('Result: ' + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    return cb(result);
}

let combineValues: (input1: number, input2: number) => number;

combineValues = add;
// combineValues = printResult;

console.log(combineValues(8, 8))
addAndHandle(10, 20, (result) => {
    console.log(result);
});