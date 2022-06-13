console.log('APP is running')


// var template = <p>This is JSX</p>; // this is what you can write in ES6/7 which Babel then should compile to ES5

// this is the ES5 that Babel compiles ES6/7 to.
// this is the only time we'll see this in the course as we will use Babel to deal with it for us
// so we can just write it simply like above
var template = React.createElement(
    "p",
    {id: "someid"},
    "This is JSX"
);

var appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);