const log: (message: string | number) => void = (message) => console.log(message);
const log2 = (message: string | number) => console.log(message);

function sum(...numbers: number[]) {
    return numbers.reduce((previousValue, curValue) => {
        return previousValue + curValue;
    }, 0);
}

log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9));

const curHobbies = ['Development', 'Cars'];
const newHobbies = ['Gardening'];
const allHobbies = newHobbies.push(...curHobbies);
console.log(curHobbies, newHobbies, allHobbies);

const [firstHobby, ...catchRestHobbies] = curHobbies;
console.log(firstHobby, catchRestHobbies, curHobbies);

const car = {
    brand: 'BMW',
    type: '530e',
    engineType: 'hybrid'
}
const { brand, type, engineType: driveTrain } = car;
console.log(brand, type, driveTrain, car);