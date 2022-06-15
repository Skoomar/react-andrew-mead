// nice simple squaring function to demonstrate the difference between normal functions and arrow funcs

// normal
// const square = function (x) {
function square(x) {
    return x * x;
}
console.log(square(8))

// arrow/anonymous function
const squareArrow = (x) => {
    return x * x;
}
console.log(squareArrow(9))

// arrow functions are 'Anonymous functions'. They don't have names. The only way to keep an arrow
// function and reference it later is to store it in a variable like we have here.
// normal functions like square above can be written as `function square()...` so they have names
// normal functions can be called before they're defined in the code (although not sure why you'd want to)
// arrow functions only can be called after they're defined in the code

// more concise arrow function
// if your arrow function is a simple one that only returns a single expression then you can write it in this concise form
const squareArrow2 = (x) => x * x;
console.log(squareArrow2(5 ))

// Section 3 Chapter 14 challenge
const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
}
console.log(getFirstName('Mike Smith'));

const getFirstName2 = (fullName) => fullName.split(' ')[0];
console.log(getFirstName2('Lewis Hamilton'));