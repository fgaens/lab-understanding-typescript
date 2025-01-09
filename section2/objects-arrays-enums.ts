// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string]
// } = {
//     name: 'Frederick',
//     age: 38,
//     hobbies: [
//         'Sports',
//         'Cooking'
//     ],
//     role: [2, 'author']
// };

enum Role {
    READ_ONLY = 5,
    ADMIN,
    AUTHOR = 100
}

const person = {
    name: 'Frederick',
    age: 38,
    hobbies: [
        'Sports',
        'Cooking'
    ],
    role: Role.ADMIN
};

// person.role.push('admin');
// person.role[1] = 10;

// person.role = [0, 'admin', 'test'];

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person);

if(person.role === Role.ADMIN) {
    console.log('is admin');
}

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // console.log(hobby.map());
}