import {createStore} from "@reduxjs/toolkit";

// shorthand arrow function syntax rememberrrrr
const incrementCount = () => ({
    type: 'INCREMENT'
});

// createStore takes state and actions
// here we've also passed a default value for state (setting count to 0)
const store = createStore((state = {count: 0}, action) => {
    // it's convention to use switch statements in createStore to deal with the actions
    switch (action.type) {
        case 'INCREMENT':
            // either take the incrementBy value passed in from the dispath() call or default to incrementing by 1
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {count: state.count + incrementBy};
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {count: state.count - decrementBy};
        case 'SET':
            return {count: action.count}
        case 'RESET':
            return {count: 0}
        default:
            return state;
    }
})

// subscribe allows you to run functions every time the Store is modified
// unsubscribe allows you to cancel this subscription when you call unsubscribe
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

// Redux Actions
// call the increment action
store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
});

store.dispatch({
    type: 'INCREMENT'
});

// call the decrement action
store.dispatch({
    type: 'DECREMENT'
});

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 9
});

store.dispatch({
    type: 'SET',
    count: 0
});
store.dispatch({
    type: 'RESET'
})

// cancel the subscriptiono
unsubscribe();