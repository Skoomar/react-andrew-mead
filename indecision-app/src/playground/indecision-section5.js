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
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            // set options to use defaultProps. If a value isn't passed in for options when IndecisionApp is called, default value is used
            options: props.options
        }
    }

    // S5:Ch44 - Lifecycle Methods - methods that run at certain events in a component's life
    // https://reactjs.org/docs/react-component.html - lifecycle methods and other info
    // Note: these are ONLY available for class-based components.
    // Functional components don't have these (but they are more efficient for it because they don't have to manage any lifecycle and keep running these methods at certain events)
    // componentDidMount - runs when the component is rendered to the screen
    componentDidMount() {
        // catch the error if the JSON passed in is invalid, causing JSON.parse() to throw error
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // if JSON data is invalid, do nothing
        }
    }

    // componentDidUpdate runs whenever the state or prop values change
    // we can use the prevProps and prevState in our lifecycle methods
    componentDidUpdate(prevProps, prevState) {
        // make sure that the options array has actually been updated before going through the saving process
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    // componentWillUnmount runs just before a component is removed. Can use it for clean-up
    componentWillUnmount() {
        console.log('unmounted')
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

        // there is a shorthand syntax for this which I've done in handleDeleteOptions but thought I'd keep the full syntax as an example too
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
        // this.setState(() => {
        //     return {
        //         options: []
        //     }
        // })

        // shorthand version of setState for when you're only modifying one thing
        // it's almost like shorthand arrow functions BUT with the arrow functions it's `=> { stuff }`
        // in JS `{}` also denotes an object but if we do `=> { stuff }` then that represents a function body NOT an object
        // so instead we do `=> ({ object stuff })`. The brackets wrap around the object so that the {} is actually seen as an object
        this.setState(() => ({options: []}));
    }

    handleDeleteOption(optionToRemove) {
        // this is the same shorthand as before but on multiple lines instead of one
        // the main difference between this and full syntax is that we throw away the return, we just wrap the object {} in brackets ()
        this.setState((prevState) => ({
            // using .filter to remove the option we can't rid of
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));

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
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

// setting up default props for a class-based component
IndecisionApp.defaultProps = {
    options: []
}

const Header = (props) => {
    // React Components have `props`. This an array of key-value pairs of any attributes which
    // are passed in through the JSX when calling the component
    console.log(props);
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    )
}

// S5:Ch41 - Default Props
// we can give React Components default props values (whether it's functional or class component)
// then if a value for that prop isn't passed in when the component is called, this value is used
Header.defaultProps = {
    title: 'Default Title'
}

const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    )
}

const Options = (props) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    // like we mentioned in a previous lecture about data binding
    // and issues with `this` not being bound to the object we would like
    // there is also method binding. e.g. handleRemoveAll must receive the context of the class
    // otherwise it won't be able to find the right object
    // so to fix that we use .bind(<desired object's name> to bind methods to the object whose context we want them to use
    // e.g. this.handleRemoveAll.bind(this) can be used when you want to call the handleRemoveAll method in this class
    // but that's a bit inefficient and means bind must be called every time the method is called
    // instead we just put it in the constructor

    // NOTE: this code was here earlier but as of Section 4: Chapter 36, we don't need the constructor and handleRemoveAll.
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

    return (
        <div>
            {/* bind handleRemoveAll to this class so it can use the props that were handed down here*/}
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started</p>}
            {
                props.options.map((option) => (
                    <Option
                        key={option}
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            {/* done this arrow function in onClick because otherwise we'd be passing the `e` events argument up
                e.g. we couldn't do onClick={props.handleDeleteOption(props.optionText)}
                this arrow function allows us to pass the optionText argument through when handleDeleteOption is called through onClick
            */}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
            >
                Remove
            </button>
        </div>
    );
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

        // if there is an error, don't wipe the textbox so the user has another chance to re-submit
        if (!error) {
            e.target.elements.option.value = '';
        }
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
