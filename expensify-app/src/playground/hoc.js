// Higher Order Components (HOC - a component that renders another component

import React from "react";
import ReactDOM from "react-dom";

// a normal component to be rendered by a HOC
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>Info is: {props.info}</p>
    </div>
);

// this will be our HOC
// typically we name the parameter which contains the component to be rendered as WrappedComponent
// this is the typical design pattern you see with HOCs
    // the HOC will have access to the Redux store
    // the HOC can then pass things as props to it's wrapped component
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share!</p>}
            {/* we want to pass props down to our wrapped component, so we pass it in using the spread operator*/}
            <WrappedComponent {...props} />
        </div>
    )
}

// then call our HOC with the normal component as an argument
const AdminInfo = withAdminWarning(Info);

// challenge for sec11 chp100
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : "Please log in to view info"}
        </div>
    )
}
const AuthInfo = requireAuthentication(Info);


// ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true}
                          info="Authentica"/>, document.getElementById('app'));