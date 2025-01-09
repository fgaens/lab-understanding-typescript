enum TimeZone {
    UTC,
    GMT
}

function Auditable(_timeZone: TimeZone) {
    console.log('Decorator factory called');
    return function <T extends { new(...args: any[]): {} }>(originalConstructor: T) {
        return class extends originalConstructor {
            createdAt: Date;

            constructor(...args: any[]) {
                super(...args);
                this.createdAt = new Date();
            }
        } as T & { new(...args: any[]): { createdAt: Date } };
    }
}

@Auditable(TimeZone.GMT)
class Customer {
    id: number;
    firstName: string;
    lastName: string;

    constructor(id: number, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

@Auditable(TimeZone.UTC)
class Book {
    id: number;
    itemName: string;
    price: number;

    constructor(id: number, itemName: string, price: number) {
        this.id = id;
        this.itemName = itemName;
        this.price = price;
    }
}

const customer1 = new Customer(1, 'Frederick', 'Gaens');
// console.log(customer1.createdAt);
console.log(customer1);

const book1 = new Book(1, 'Some Book', 29.99);
// console.log(book1.createdAt);
console.log(book1);