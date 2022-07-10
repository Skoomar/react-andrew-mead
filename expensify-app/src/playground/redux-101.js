import {createStore} from "@reduxjs/toolkit";


// const add = (data) => {
//     return data.a + data.b
// }

// rewrite the above add function but use destruction to make it look nicer
// so instead of taking the 'data' array as parameter and then having to use it like indexes. Just put { x... } in the parameters and it'll deal
// works for objects and arrays
const add = ({ a, b }) => {
    return a + b;
}

// Action Generators

// a function to be used as an Action Generator
// shorthand arrow function syntax rememberrrrr
// payload is anything passed into the function. is empty by default but we can use to pass stuff like incrementBy etc
// ok ignore the payload thing, we've changed that to use the destruct stuff to put incrementBy directly there. default value for incrementBy set to 1
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    // incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1 -- don't need this anymore as our destruction stuff above handles the case if incrementBy isn't passed in
    // also remember we don't have to write out incrementBy: incrementBy as they have the same name. Can just put incrementBy and it'll know what we mean
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET',
})

// createStore takes state and actions
// here we've also passed a default value for state (setting count to 0)
const store = createStore((state = {count: 0}, action) => {
    // it's convention to use switch statements in createStore to deal with the actions
    switch (action.type) {
        case 'INCREMENT':
            // either take the incrementBy value passed in from the dispatch() call or default to incrementing by 1 ---
            // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1; - no longer need this here as we've put it in the action generator above
            return {count: state.count + action.incrementBy};
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

// write dispatch as an 'Action Generator' instead of having to write out the action each time
store.dispatch(incrementCount());

store.dispatch(incrementCount({ incrementBy: 5 }))

// call the decrement action
// store.dispatch({
//     type: 'DECREMENT'
// });

store.dispatch(decrementCount({ decrementBy: 12 }))

store.dispatch(setCount({ count: 50 }));

store.dispatch(resetCount());

// cancel the subscriptiono
unsubscribe();