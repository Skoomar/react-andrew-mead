'use strict';

var showDetails = false;

var onToggleDetails = function onToggleDetails() {
    showDetails = !showDetails;
    render();
};

var appRoot = document.getElementById('app');
var render = function render() {
    var template = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Visibility Toggle'
        ),
        React.createElement(
            'button',
            { onClick: onToggleDetails },
            showDetails ? 'Hide details' : 'Show details'
        ),
        showDetails && React.createElement(
            'p',
            null,
            'These are details'
        )
    );
    ReactDOM.render(template, appRoot);
};
render();
