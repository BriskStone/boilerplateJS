import Dog from '../shared/dog';

//This is the older CommonJS syntax
//const Dog = require('./dog');

const toby = new Dog('Toby');

console.log(toby.bark());