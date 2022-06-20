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

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
    console.log(randomNum);
}

const appRoot = document.getElementById('app');

const numbers = [55, 101, 1000];
const render = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <p>{app.options.length}</p>
            {/* Use disabled to disable the button under certain conditions*/}
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>


            {/* JSX supports arrays. You can put simple things like numbers or strings.
                You can also have arrays of JSX (but you need to give a key attribute to each element.
                When you put just numbers/strings in, you'll notice in the console that React
                splits them up using ---- react text ------ comments so it knows which bits to render.
                But with arrays of JSX, you need to put a key on each element so it can differentiate them.*/}
            {
                [<p key="a">a</p>, <p key="b">b</p>, <p key="c">c</p>]
            }

            {/* Dynamically generate array of JSX */}
            {
                numbers.map((number) => {
                    return <p key={number}>Number: {number}</p>;
                })
            }

            <ol>
                {
                    // don't forget to put the key attribute
                    app.options.map((option) => <li key={option}>{option}</li>)
                }
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
