class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Wah wah, I am ${this.name}`;
  }
}

//This was the older CommonJS way
//module.exports = Dog;

//This is the new ES6 way
//And it could be put at the beggining exporting anonymously.
module.exports = Dog;