interface addFn {
    (a: number, b: number): number;
}

let add: addFn;
add = (n1: number, n2: number) => {
    return n1 + n2;
}

type addFunction = (a: number, b: number) => void;
let someAddFunction = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name: string;
    outputName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    outputName?: string;
    constructor(public name: string, public age: number, outputName?: string) {
        if (outputName) {
            this.outputName = outputName;
        }
    }

    greet(phrase: string): void {
        console.log(phrase + ' ' + this.name);
        if (this.outputName) {
            console.log(this.outputName);
        }
    }

}

let user1: Greetable;
user1 = new Person('Frederick', 38, 'How are you?');
// user1.name = 'Jos';
user1.greet('Hi there, I am');
console.log(user1);