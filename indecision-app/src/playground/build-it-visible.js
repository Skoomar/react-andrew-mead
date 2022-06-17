
let showDetails = false;

const appRoot = document.getElementById('app');
const render = () => {
    const template = (
        <h1>Visibility Toggle</h1>

        <button onClick={onToggleDetails}>{showDetails ? 'Hide details' : 'Show details'}</button>
    )
    ReactDOM.render(template, appRoot);
}
render();