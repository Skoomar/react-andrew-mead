// in es6-arrow-funcs-2.js we saw the forEach method being used
// most of the time you won't use forEach, instead you will use the map method

const user = {
    name: "Umar",
    cities: ['London', 'Nottingham', 'York', 'Exeter'],
    printPlacesLived() {
        console.log(this.name);
        console.log(this.cities);

        // replace this forEach with the map function down below
        this.cities.forEach((city) => {
            // now we're able to use `this`
            console.log(this.name + ' has lived in ' + city);
        })

        // map is called for each item in the array
        this.cities.map((city) => {
            console.log(this.name + ' has lived in ' + city);
        })

        // the difference between map and e.g. forEach, is that
        // map can also transform each item to return an array of transformed values
        const cityTransform = this.cities.map((city) => {
            return this.name + ' has lived in ' + city;
        })
    }
}
// user.printPlacesLived();


// Section 3 Chapter 15 challenge

const multiplier = {
    numbers: [1, 2, 3, 4, 5],
    multiplyBy: 5,
    multiply() {
        return this.numbers.map((number) => number * this.multiplyBy);
    }
}
console.log(multiplier.multiply());