// use ES6's destructuring feature to pull variable names from an object or array

// Object Destructuring
const person = {
    name: 'Umar',
    age: 24,
    location: {
        city: 'Notts',
        temp: 25
    }
}

// this is destructuring
// this automatically looks for the values of the same name in the object and pulls them out to variables of that name
// also can put a default value as a fallback for if there's no var of that name in the object. As shown with name
const { name = 'Anonymous', age } = person;
// saves you from having to do e.g. const name = person.name etc for each variable

console.log(`${name} is ${age}`)

// destructuring from the nested object inside person
// also can rename a variable as done here with temp. we pull temp from the object and name it as temperature
const { city, temp: temperature } = person.location;
if (city && temperature) {
    console.log(`It's ${temperature} in ${city}`)
}

// destructuring with renaming AND default value
const { name: firstName = 'Anon' } = person;
console.log(firstName)


// Challenge
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Published' } = book.publisher;
console.log(publisherName);
//---------------------------------------------------------------------------
// Array Destructuring
// can destruct arrays to use names for the values in the array instead of just indexes array[1] which don't really tell you what it actually is
const address = ['1299 Juniper Street', 'Philly', 'Pennsylvania', '19147'];

const [street, city, state, zip] = address;
console.log(`You are in ${city} ${state}`)

// if you only want to destruct the first x values then you only have to put names up until the xth index
// e.g. here we leave off the final index which contains the zip code
const [ street, city, state ] = address;

// if you want to skip a value, you can just leave an empty space between the commas
// e.g. if we want to skip street and city
const [, , state] = address;


// Challenge
const item = ['Coffee', '$2.00', '$2.50', '$2.75'];

const [ beverage, , mediumPrice] = item;
console.log(`A medium ${beverage} costs ${mediumPrice}`)