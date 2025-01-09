function Logger(logString: string) {
    console.log('Logger decorator function');
    return function (constructor: Function) {
        console.log('Logging: ' + logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('Template decorator function');
    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(...originalConstructorParameters: any[]) {
                super();
                console.log('Rendering template');
                const element = document.getElementById(hookId);
                if (element) {
                    element.innerHTML = template;
                    element.querySelector('h1')!.textContent = originalConstructorParameters[0];
                }
            }
        }
    }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
        console.log('Creating person object!');
    }
}


const pers = new Person('Max');
console.log(pers);


function Log(target: any, propertyName: string) {
    console.log('Property decorator');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string, position: number) {
    console.log('Parameter decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}


class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this.price = val;
        } else {
            throw new Error('Invalid price - should be positive!');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;
}

class Printer {
    message = 'This works';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const printer = new Printer();
const button = document.querySelector('button')!;
button.addEventListener('click', printer.showMessage)

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[];
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propertyName]: ['required']
    }
}

function PositiveNumber(target: any, propertyName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propertyName]: ['positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @Required
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', e => {
    e.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        alert('Invalid input.')
        return;
    }
    console.log(createdCourse);
})