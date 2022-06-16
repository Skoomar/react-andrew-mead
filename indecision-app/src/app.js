console.log('App.js is running');

const app = {
    title: "Indecision App",
    subtitle: "yee",
    options: ["One", "Two"]
};

// We don't want to just use normal HTML forms as they re-render the whole page to collect the form data
// instead we use React event handlers to take the input from the form without screwing with refreshing the page
// https://reactjs.org/docs/handling-events.html - to see all the event handlers you can use in React
// here we will use onSubmit

const onFormSubmit = (e) => {
    e.preventDefault() // stops the full page refreshing

    // .target points to the element that the event started on, <form> in this case
    // .elements contains a list of child elements from the target element
    // .option, here we use the name that we defined the <input> with to get access to it
    // .value - the value inside that element
    const option = e.target.elements.option.value;

    if (option) {
        app.options.push(option); // push the value into the options array in the app object
        e.target.elements.option.value = ''; // clear the input
        render();
    }
}

const onRemoveAll = () => {
    app.options = [];
    render();
}

const appRoot = document.getElementById('app');
const render = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <p>{app.options.length}</p>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
                <li>Item one</li>
                <li>Item two</li>
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add option</button>
            </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
}
render();
