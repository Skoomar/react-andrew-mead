// React Components are just ES6 classes which extend React.Component
// React Components MUST have a render function defined
// React Components must have the first letter capitalised or it just won't find the right thing and won't render your component

// Section 4: Chapter 36. Data can be passed downstream to other classes but those classes can't modify that data and then send it back
// one-way dataflow. So instead we can pass down methods from this class to those other classes inside their props.
// those classes can then call those methods from their props. e.g. handleDeleteOptions being passed to Options class
// then when the method modifies the value. The render function within THIS class will be run which then causes the downstream classes being used
// to also re-render (because they are included in the JSX for this class). So the new values will update in the downstream classes
class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            options: []
        }
    }

    handleAddOption(option) {
        // some validation of the option that has been passed in
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            // indexOf returns -1 if the given value CANNOT be found, else it returns the index.
            // So if it's not -1, that means that option is already in the array and is being duplicated
            return 'This option already exists';
        }

        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            }
        })
    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            }
        })
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        );
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
    render() {
        return (
            <div>
                <button
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOptions}
                >
                    What should I do?
                </button>
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

    // NOTE: this code was here earlier but as of Section 4: Chapter 36, we don't need the constructor and handleRemoveAll. We use props instead
    // constructor(props) {
    //     super(props);
    //     // so doing it this way means that you don't have to type out .bind multiple times for the same method when you call it throughout the class
    //     // just call it here and it'll be bound when component is initialised. So JS doesn't have to re-bind it every time it's called
    //     this.handleRemoveAll = this.handleRemoveAll.bind(this);
    // }
    //
    // handleRemoveAll() {
    //     alert('remove all')
    // }

    render() {
        return (
            <div>
                {/* bind handleRemoveAll to this class so it can use the props that were handed down here*/}
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
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
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }

    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();

        const error = this.props.handleAddOption(option);
        this.setState(() => {
            // if you are setting state with a variable that has the same name as the state attribute, you can just put that name there instead of typing `error: error`
            // can put the return all on one line as you're only updating one thing. common to do this with error handling state
            return { error }
        })
        e.target.elements.option.value = '';
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}


ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));