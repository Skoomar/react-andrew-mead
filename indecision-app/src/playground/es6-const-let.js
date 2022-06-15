// var is all fun to use
var nameVar = "Umar";

console.log("nameVar", nameVar);

// you can assign another value to a var which is all well and good
nameVar = "GEEEEOOOOOOOORGE";

// but you can also re-define it like this and JS won't throw any errors or anything
var nameVar = "Bruh";
// this is bad because you could be re-defining variables that you're already using elsewhere
// and you won't realise that it's already being used. Makes debugging annoying


// instead we use let and const in ES6

// let will create a variable within the current scope and then once that scope is exited, the variable is cleaned up
let nameLet = 'Bill';
// you're allowed to re-assign
nameLet = 'Ben';

// BUT if you try to re-define a let variable then JS will throw a duplicate declaration error
let nameLet = 'NOOO';


// const creates a constant variable which can't be re-assigned
const nameConst = 'Frank';
nameConst = 'NOOO';