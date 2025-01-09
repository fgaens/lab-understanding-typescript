import "reflect-metadata"

import {plainToInstance} from 'class-transformer';
import {Product} from './product.model';
import {validate} from "class-validator";

const products = [
    {title: 'A Carpet', price: 29.99},
    {title: 'A Book', price: 19.99}
];

const convertedProducts = products.map(product => {
    return new Product(product.title, product.price);
})

for (const product of convertedProducts) {
    console.log(product.getInformation());
}

const loadedProducts = plainToInstance(Product, products);

for (const product of loadedProducts) {
    console.log(product.getInformation());
}

const newProduct = new Product("", -5.99);
validate(newProduct).then(errors => {
    if (errors.length > 0) {
        console.log('Validation failed');
    } else {
        console.log(newProduct.getInformation());
    }
});
