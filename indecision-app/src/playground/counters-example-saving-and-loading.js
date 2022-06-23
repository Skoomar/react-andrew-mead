// Section 5: Ch46 - we will re-create counters-example using the saving/loading to localStorage
// we will store count to localStorage to show how to work with ints in JS, converting from string->int, checking for isNan etc

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);

        // set up the state object with default value for count
        this.state = {
            // remove the defaultProps thing from before as we need to just be loading count from localStorage
            count: 0
        };
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('count');
            const count = parseInt(JSON.parse(json), 10);

            if (!isNaN(count)) {
                this.setState(() => ({ count }));
            }
        } catch (e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            const json = JSON.stringify(this.state.count);
            localStorage.setItem('count', json);
        }
    }

    handleAddOne() {
        this.setState((prevState) => ({ count: prevState.count + 1 }));
    }

    handleMinusOne() {
        this.setState((prevState) => ({ count: prevState.count - 1}));
    }

    handleReset() {
        this.setState(() => ({ count: 0 }));
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

ReactDOM.render(<Counter />, document.getElementById('app'));