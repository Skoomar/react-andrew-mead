class Person {
    // ES6 classes need a class like this
    constructor(name="Anonymous", age=0) {
        // the old way to do default constructor values would be this.name = name || "Anonymous"
        // but in ES6 we can do it as done in the constructor signature above ^
        this.name = name;
        this.age = age;
    }

    getGreeting() {
        // you can do this to concatenate stuff
        // return "Hi" + this.name;

        // but in ES6 we can use template strings like this
        return `Hi, I'm ${this.name}`
    }

    getDescription() {
        return `${this.name} is ${this.age} year(s) old`
    }
}

// we can extend classes. This makes a child class which can use the methods and attributes of the parent class
// but can be optimised to be more specific to a certain thing
// e.g. a student is a specific type of person
class Student extends Person {
    constructor(name, age, major) {
        // use super() to call the constructor of the parent Person class
        // that will deal with the attributes that this child class shares with the parent class
        // then you can deal with the attributes specific to this class here
        // so you don't have to write this.name = name etc again
        super(name, age);
        this.major = major;
    }

    hasMajor() {
        // easier than writing this.major != "" or something
        // just a way of getting the boolean representation of whether there is a value there or not
        return !!this.major;
    }

    // we can override methods from the parent class
    getDescription() {
        // can call the parent class version of this method to get the description and then modify it to add the major
        let description = super.getDescription();

        if (this.hasMajor()) {
            description += `, their major is ${this.major}`;
        }
        return description;
    }
}

class Traveller extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }

    hasHomeLocation() {
        return !!this.homeLocation;
    }

    getGreeting() {
        let greeting = super.getGreeting();

        if (this.hasHomeLocation()) {
            greeting += `, I'm visiting from ${this.homeLocation}`;
        }
        return greeting;
    }
}

const me = new Person();
console.log(me.getGreeting());

const other = new Person();
console.log(other);