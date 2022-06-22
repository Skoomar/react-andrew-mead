'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// React Components are just ES6 classes which extend React.Component
// React Components MUST have a render function defined
// React Components must have the first letter capitalised or it just won't find the right thing and won't render your component

// Section 4: Chapter 36. Data can be passed downstream to other classes but those classes can't modify that data and then send it back
// one-way dataflow. So instead we can pass down methods from this class to those other classes inside their props.
// those classes can then call those methods from their props. e.g. handleDeleteOptions being passed to Options class
// then when the method modifies the value. The render function within THIS class will be run which then causes the downstream classes being used
// to also re-render (because they are included in the JSX for this class). So the new values will update in the downstream classes
var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);

        _this.state = {
            // set options to use defaultProps. If a value isn't passed in for options when IndecisionApp is called, default value is used
            options: props.options
        };
        return _this;
    }

    // S5:Ch44 - Lifecycle Methods - methods that run at certain events in a component's life
    // https://reactjs.org/docs/react-component.html - lifecycle methods and other info
    // Note: these are ONLY available for class-based components.
    // Functional components don't have these (but they are more efficient for it because they don't have to manage any lifecycle and keep running these methods at certain events)
    // componentDidMount - runs when the component is rendered to the screen


    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log('mounted');
        }

        // componentDidUpdate runs whenever the state or prop values change
        // we can use the prevProps and prevState in our lifecycle methods

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // make sure that the options array has actually been updated before going through the saving process
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }

        // componentWillUnmount runs just before a component is removed. Can use it for clean-up

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log('unmounted');
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            // some validation of the option that has been passed in
            if (!option) {
                return 'Enter valid value to add item';
            } else if (this.state.options.indexOf(option) > -1) {
                // indexOf returns -1 if the given value CANNOT be found, else it returns the index.
                // So if it's not -1, that means that option is already in the array and is being duplicated
                return 'This option already exists';
            }

            // there is a shorthand syntax for this which I've done in handleDeleteOptions but thought I'd keep the full syntax as an example too
            this.setState(function (prevState) {
                return {
                    options: prevState.options.concat(option)
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var randomNum = Math.floor(Math.random() * this.state.options.length);
            var option = this.state.options[randomNum];
            alert(option);
        }
    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            // this.setState(() => {
            //     return {
            //         options: []
            //     }
            // })

            // shorthand version of setState for when you're only modifying one thing
            // it's almost like shorthand arrow functions BUT with the arrow functions it's `=> { stuff }`
            // in JS `{}` also denotes an object but if we do `=> { stuff }` then that represents a function body NOT an object
            // so instead we do `=> ({ object stuff })`. The brackets wrap around the object so that the {} is actually seen as an object
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(optionToRemove) {
            // this is the same shorthand as before but on multiple lines instead of one
            // the main difference between this and full syntax is that we throw away the return, we just wrap the object {} in brackets ()
            this.setState(function (prevState) {
                return {
                    // using .filter to remove the option we can't rid of
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var title = 'Indecision';
            var subtitle = 'Put your life in the hands of a computer';

            return React.createElement(
                'div',
                null,
                React.createElement(Header, { title: title, subtitle: subtitle }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOption, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

// setting up default props for a class-based component


IndecisionApp.defaultProps = {
    options: []
};

var Header = function Header(props) {
    // React Components have `props`. This an array of key-value pairs of any attributes which
    // are passed in through the JSX when calling the component
    console.log(props);
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

// S5:Ch41 - Default Props
// we can give React Components default props values (whether it's functional or class component)
// then if a value for that prop isn't passed in when the component is called, this value is used
Header.defaultProps = {
    title: 'Default Title'
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.handlePick,
                disabled: !props.hasOptions
            },
            'What should I do?'
        )
    );
};

var Options = function Options(props) {
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

    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteOptions },
            'Remove All'
        ),
        React.createElement(
            'p',
            null,
            props.options.length
        ),
        props.options.map(function (option) {
            return React.createElement(Option, {
                key: option,
                optionText: option,
                handleDeleteOption: props.handleDeleteOption
            });
        })
    );
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            {

                onClick: function onClick(e) {
                    props.handleDeleteOption(props.optionText);
                }
            },
            'Remove'
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();

            var option = e.target.elements.option.value.trim();

            var error = this.props.handleAddOption(option);
            this.setState(function () {
                // if you are setting state with a variable that has the same name as the state attribute, you can just put that name there instead of typing `error: error`
                // can put the return all on one line as you're only updating one thing. common to do this with error handling state
                return { error: error };
            });
            e.target.elements.option.value = '';
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
