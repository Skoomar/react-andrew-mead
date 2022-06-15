"use strict";

var _arguments = arguments;
// Some things to keep in mind about arrow functions
// arguments object - no longer bound with arrow functions. I.e. if you try to access the arguments, it won't work
// this keyword - no longer bound with arrow functions


// example of arguments object not being bound
// notice that where the function has been called, 3 arguments have been passed even though the
// function only takes two arguments. JS can handle this and you can access the extra arguments passed
// in by using the `arguments` object
// in arrow functions, you can no longer use this. You're limited the parameters defined in the function signature
var add = function add(a, b) {
    // in normal functions we can access the arguments using this arguments object
    console.log(arguments);
    return a + b;
};
console.log(add(1, 2, 3));

// arrow function
var add2 = function add2(a, b) {
    // trying to use arguments object in arrow functions will throw an error
    console.log(_arguments);
    return a + b;
};
// so if, for whatever reason, you've decided you need to see extra arguments that may be passed in,
// just use normal functions as you won't be able to see them in arrow functions
