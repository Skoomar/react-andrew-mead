// we will re-create counters-example but using React State
// State allows automatic re-rendering of components when their value changes.
// So we don't have to keep calling render() as we have been doing so far

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);

        // set up the state object with default value for count
        this.state = {
            // set count to take the defaultProps value if no value is passed in
            count: props.count
        };
    }


    handleAddOne() {
        // you can read from state directly just using this.state.<variable name>
        // but you shouldn't re-assign variables that are in state directly like this.state.<variable> = <new value>
        // the value will update in the state object BUT it won't re-render the component to the screen
        // you have to use `setState` which will update the value AND re-render the component
        // the setState object does NOT overwrite the whole state object.
        // It only changes the variable you have specified to update
        // so if you have any other variables in state, only count will be affected here, the others would stay the same
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        })
    }

    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            }
        })
    }

    handleReset() {
        // don't need prevState here as we don't need to know what count is already
        this.setState(() => {
            return {
                count: 0
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

// set default value for count
Counter.defaultProps = {
    count: 0
}

ReactDOM.render(<Counter />, document.getElementById('app'));