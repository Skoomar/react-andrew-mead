import {createStore} from "@reduxjs/toolkit";

// createStore takes state and actions
// here we've also passed a default value for state (setting count to 0)
const store = createStore((state = {count: 0}, action) => {
    // it's convention to use switch statements in createStore to deal with the actions
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        case 'RESET':
            return { count: 0 }
        default:
            return state;
    }
})

// Redux Actions
// call the increment action
store.dispatch({
    type: 'INCREMENT'
});
store.dispatch({
    type: 'INCREMENT'
});

// call the decrement action
store.dispatch({
    type: 'DECREMENT'
});

store.dispatch({
    type: 'RESET'
});

console.log(store.getState());