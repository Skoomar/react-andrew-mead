
// React Components are just ES6 classes which extend React.Component
// React Components MUST have a render function defined
// React Components must have the first letter capitalised or it just won't find the right thing and won't render your component
class IndecisionApp extends React.Component {
    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        const options = ['one', 'two', 'four'];

        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action/>
                <Options options={options}/>
                <AddOption/>
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        // React Components have `props`. This an array of key-value pairs of any attributes which
        // are passed in through the JSX when calling the component

        console.log(this.props);
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        )
    }
}

class Action extends React.Component {
    handlePick() {
        alert('Handle pick');
    }

    render() {
        return (
            <div>
                <button onClick={this.handlePick}>What should I do?</button>
            </div>
        )
    }
}

class Options extends React.Component {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    // like we mentioned in a previous lecture about data binding
    // and issues with `this` not being bound to the object we would like
    // there is also method binding. e.g. handleRemoveAll must receive the context of the class
    // otherwise it won't be able to find the right object
    // so to fix that we use .bind(<desired object's name> to bind methods to the object whose context we want them to use
    // e.g. this.handleRemoveAll.bind(this) can be used when you want to call the handleRemoveAll method in this class
    // but that's a bit inefficient and means bind must be called every time the method is called
    // instead we just put it in the constructor

    constructor(props) {
        super(props);
        // so doing it this way means that you don't have to type out .bind multiple times for the same method when you call it throughout the class
        // just call it here and it'll be bound when component is initialised. So JS doesn't have to re-bind it every time it's called
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
    }

    handleRemoveAll() {
        alert('remove all')
    }

    render() {
        return (
            <div>
                {/* bind handleRemoveAll to this class so it can use the props that were handed down here*/}
                <button onClick={this.handleRemoveAll.bind(this)}>Remove All</button>
                <p>{this.props.options.length}</p>
                {
                    this.props.options.map((option) => <Option key={option} optionText={option}/>)
                }
            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                {this.props.optionText}
            </div>
        );
    }
}

class AddOption extends React.Component {
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value;

        if (option) {
            alert(option);
            e.target.elements.option.value = '';
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}


ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));