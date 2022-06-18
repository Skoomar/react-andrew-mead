let showDetails = false;

const onToggleDetails = () => {
    showDetails = !showDetails;
    render();
}

const appRoot = document.getElementById('app');
const render = () => {
    const template = (
        <div>
            <h1>Visibility Toggle</h1>

            <button onClick={onToggleDetails}>{showDetails ? 'Hide details' : 'Show details'}</button>
            {showDetails && <p>These are details</p>}
        </div>
    )
    ReactDOM.render(template, appRoot);
}
render();