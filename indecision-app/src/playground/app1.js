// https://babeljs.io/repl to see how Babel converts the ES6/7 to ES5

// this is the ES5 that Babel compiles ES6/7 to.
// this is the only time we'll see this in the course as we will use Babel to deal with it for us
// so we can just write it simply like above
// var template = React.createElement(
//     "p",
//     {id: "someid"},
//     "This is JSX"
// );

// var template = <p>This is JSX</p>; // this is what you can write in ES6/7 which Babel then should compile to ES5

var app = {
    title: "Indecision App",
    subtitle: "yee",
    options: ["One", "Two"]
};

var template = (
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{app.options.length > 0 ? "Here are your options" : "No options"}</p>
    </div>
);



// Section 3: Chapter 10 & 11 challenge
// var userName = "Umar";
// var userAge = 24;
// var userLocation = "Notts";

var user = {
    name: "Umar",
    age: 24,
    location: "Notts"
}

// Conditional Rendering
// can render JSX if a condition is true, otherwise doesn't render any JSX
function getLocation(location) {
    if (location) {
        return <p>Location: {location}</p>;
    }
}

var templateTwo = (
    <div>
        {/* Ternary Operator: for when you want to render either one thing or the other*/}
        <h1>{user.name ? user.name : "Anonymous"}</h1>
        {/* Logical AND operator: for when you want to render either something or nothing.
            If condition on the LHS is true then the JSX in the RHS will be rendered. Otherwise
            doesn't render anything. Bassically a short way of doing what was done for rendering location.*/}
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
        {getLocation(user.location)}
    </div>
)


var appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);