const {Person, Property} = require('./Person')

john = new Person('John', 'Doe', 38, 'male')

jane = new Person('Jane', 'Doe', 23, 'female')

console.log(john.introduce())

console.log(jane.introduce())