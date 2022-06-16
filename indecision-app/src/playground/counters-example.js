// From Section 3 Chapter 17: Manual Data Binding
let count = 0;
const addOne = () => {
    count++;
    console.log('addOne');
}
const minusOne = () => {
    console.log('minusOne');
}
const reset = () => {
    console.log('reset');
}

const template = (
    <div>
        <h1>Count: {count}</h1>
        {/* Note: In JSX some tag attributes are different to HTML.
            e.g. class in HTML is className in JSX. If you use class, an error will be thrown
            Because in JavaScript, class (and other words) are reserved for keywords.
            https://reactjs.org/docs/dom-elements.html look here for HTML attributes that React supports.
            also note that attributes are camel-cased instead of dashed like in HTML
         */}
        <button onClick={addOne} className="bruh">+1</button>
        {/* Can also put an arrow function inside onClick. It's looks messy but it's possible */}
        <button onClick={() => {
            console.log('some value');
        }}>random
        </button>

        <button onClick={minusOne}>-1</button>
        <button onClick={reset}>Reset</button>
    </div>
);

// JSX is converted into React createElement calls which returns an object. e.g. the one printed here
console.log(template);
// if you look at the console output for this JSX object, under

var appRoot = document.getElementById('app');
// ReactDOM.render(template, appRoot);

// JSX does not have built-in data binding. So if you stick your variable into JSX and then
// the variable value changes, the JSX will not automatically re-render to show the new value.
// You need to set it up to do that yourself.
let count2 = 0;
const addOne2 = () => {
    count2++;
    console.log('addOne');
    // this is basically what's happening behind the scenes when you use React Components and Listeners
    renderCounterApp();
}
const minusOne2 = () => {
    count2--;
    console.log('minusOne');
    renderCounterApp();
}
const reset2 = () => {
    count2 = 0;
    console.log('reset');
    renderCounterApp();
}

const renderCounterApp = () => {
    const templateTwo = (
        <div>
            <h1>Count: {count2}</h1>
            <button onClick={addOne2}>+1</button>
            <button onClick={minusOne2}>-1</button>
            <button onClick={reset2}>Reset</button>
        </div>
    );

    ReactDOM.render(templateTwo, appRoot);
};

renderCounterApp();