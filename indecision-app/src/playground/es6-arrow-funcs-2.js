// Some things to keep in mind about arrow functions
    // arguments object - no longer bound with arrow functions. I.e. if you try to access the arguments, it won't work
    // this keyword - no longer bound with arrow functions


// example of arguments object not being bound
// notice that where the function has been called, 3 arguments have been passed even though the
// function only takes two arguments. JS can handle this and you can access the extra arguments passed
// in by using the `arguments` object
// in arrow functions, you can no longer use this. You're limited the parameters defined in the function signature
const add = function(a, b) {
    // in normal functions we can access the arguments using this arguments object
    console.log(arguments);
    return a + b;
}
console.log(add(1, 2, 3))

// arrow function
const add2 = (a, b) => {
    // trying to use arguments object in arrow functions will throw an error
    // console.log(arguments);
    return a + b;
}
// so if, for whatever reason, you've decided you need to see extra arguments that may be passed in,
// just use normal functions as you won't be able to see them in arrow functions

//==================================================================================================

// example of this keyword not being bound
const user = {
    name: "Umar",
    cities: ['London', 'Nottingham', 'York', 'Exeter'],
    // we can define functions inside objects
    printPlacesLived: function () {
        // function can use `this` to refer to the other properties in this object
        console.log(this.name);
        console.log(this.cities);

        // here we create a simple anonymous function (not an arrow function)
        this.cities.forEach(function (city) {
            // now if we use `this` inside this anonymous function, an error will be thrown
            // because in simple anonymous functions, `this` is set to undefined
            console.log(this.name + ' has lived in ' + city);
        })
    }
}
user.printPlacesLived();

// in arrow functions, the function doesn't bind `this` to its own value, instead it just takes
// the value of their parent scope/context
const user2 = {
    name: "Umar",
    cities: ['London', 'Nottingham', 'York', 'Exeter'],
    printPlacesLived: function () {
        console.log(this.name);
        console.log(this.cities);

        // using an arrow function this time
        this.cities.forEach((city) => {
            // now we're able to use `this`
            console.log(this.name + ' has lived in ' + city);
        })
    }
}
user2.printPlacesLived();

// there are certain places where you don't want to use arrow functions
const user3 = {
    name: "Umar",
    cities: ['London', 'Nottingham', 'York', 'Exeter'],

    // if we make printPlacesLived an arrow function instead then it will use the wrong `this`.
    // it won't be the `this` for the user3 object, it'll be the `this` of the parent
    // scope of the object (the global scope in this case)
    // so better just to leave this as a normal ES5 function
    printPlacesLived: () => {
        console.log(this.name);
        console.log(this.cities);

        // using an arrow function this time
        this.cities.forEach((city) => {
            // now we're able to use `this`
            console.log(this.name + ' has lived in ' + city);
        })
    }
}
user3.printPlacesLived();

// note: there is a workaround if you REALLY want to use `this` in a conventional anonymous function
const user4 = {
    name: "Umar",
    cities: ['London', 'Nottingham', 'York', 'Exeter'],
    printPlacesLived: function () {
        console.log(this.name);
        console.log(this.cities);

        // we can assign the value of `this` to a variable which we can use inside the anonymous func
        const that = this;
        this.cities.forEach(function (city) {
            console.log(that.name + ' has lived in ' + city);
        })
    }
}
user4.printPlacesLived();

