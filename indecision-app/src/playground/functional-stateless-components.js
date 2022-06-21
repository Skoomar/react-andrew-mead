// Functional React Components are put in functions instead of classes
// they are stateless (they have no state, no way of storing a state object as an attribute like in classes)
// for when you want a simple component
// Props: functional components don't have state BUT they can still receive props
// they are passed in like a parameter to the functional component
// we don't use this.props as we are now not in a class. So it's just props.<attribute>
const User = (props) => {
    // functional components just return JSX. same as the render function in class components
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    )
}

ReactDOM.render(<User name="Umar" age={24} />, document.getElementById('app'));