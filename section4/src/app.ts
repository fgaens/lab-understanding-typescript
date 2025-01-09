const userName = 'Max';

/*
 * variable accessible in current block and lower blocks
 */
let result2;
function add2(a: number, b: number = 1) {
    result2 = a + b;
    return result2;
}
console.log(result2);
console.log(add2(4));


/*
 *  WORKING JAVASCRIPT CODE
 * Not valid in typescript
 */
// let age = 30;
// if(age > 20) {
//     var isOld = true;
// }
// console.log(isOld);

/*
 * Typescript way of above
 * Not valid in typescript
 */
var result;
function add(a: number, b: number) {
    result = a + b;
    return result;
}
console.log(result);

const add3 = (a: number, b: number) => {
    return a + b;
}

console.log(add3(2, 5));

const add4 = (a: number, b: number) => a + b;

console.log(add4(2, 5));

// const printOutput = (output: string | number) => console.log(output);
const printOutput: (output: string | number) => void = output => console.log(output);
printOutput(add4(5, 2));

const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', event => console.log(event));
}


const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking', ...hobbies];

activeHobbies.push(...hobbies);

const person = {
    firstName: 'Max',
    age1: 30
}

const copiedPerson = { ...person };

const add5 = (...numbers: number[]) => {
    return numbers.reduce((currentResult, currentValue) => {
        return currentResult + currentValue;
    }, 0);
};

console.log(add5(5, 10, 2, 3.7));

const add6 = (...numbers: [number, number, number]) => {
    return numbers.reduce((currentResult, currentValue) => {
        return currentResult + currentValue;
    }, 0);
};

console.log(add6(5, 10, 2));

const hobby1 = hobbies[0];
const hobby2 = hobbies[1];
const [hobby11, hobby22, ...remainingHobbies] = hobbies;

const { firstName, age1 } = person;
console.log(person, firstName, age1);
const { firstName: userName2, age1: someAge } = person;
console.log(person, userName2, someAge);