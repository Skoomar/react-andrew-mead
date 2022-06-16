"use strict";

console.log('App.js is running');

var app = {
    title: "Indecision App",
    subtitle: "yee",
    options: ["One", "Two"]
};

// We don't want to just use normal HTML forms as they re-render the whole page to collect the form data
// instead we use React event handlers to take the input from the form without screwing with refreshing the page
// https://reactjs.org/docs/handling-events.html - to see all the event handlers you can use in React
// here we will use onSubmit

var onFormSubmit = function onFormSubmit(e) {
    e.preventDefault(); // stops the full page refreshing

    // .target points to the element that the event started on, <form> in this case
    // .elements contains a list of child elements from the target element
    // .option, here we use the name that we defined the <input> with to get access to it
    // .value - the value inside that element
    var option = e.target.elements.option.value;

    if (option) {
        app.options.push(option); // push the value into the options array in the app object
        e.target.elements.option.value = ''; // clear the input
        render();
    }
};

var onRemoveAll = function onRemoveAll() {
    app.options = [];
    render();
};

var appRoot = document.getElementById('app');
var render = function render() {
    var template = React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            app.title
        ),
        app.subtitle && React.createElement(
            "p",
            null,
            app.subtitle
        ),
        React.createElement(
            "p",
            null,
            app.options.length > 0 ? 'Here are your options' : 'No options'
        ),
        React.createElement(
            "p",
            null,
            app.options.length
        ),
        React.createElement(
            "button",
            { onClick: onRemoveAll },
            "Remove All"
        ),
        React.createElement(
            "ol",
            null,
            React.createElement(
                "li",
                null,
                "Item one"
            ),
            React.createElement(
                "li",
                null,
                "Item two"
            )
        ),
        React.createElement(
            "form",
            { onSubmit: onFormSubmit },
            React.createElement("input", { type: "text", name: "option" }),
            React.createElement(
                "button",
                null,
                "Add option"
            )
        )
    );
    ReactDOM.render(template, appRoot);
};
render();
