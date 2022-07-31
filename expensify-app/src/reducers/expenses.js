const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // never use stuff like .push() in reducers, use stuff like .concat or the spread operator instead as it doesn't mutate the current state
            // because remember that they shouldn't mutate the current state directly, just creates a new version of state
            // return state.concat(action.expense);
            return [
                // ES6 Spread Operator
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    // use the Spread operator to get current state of expenses AND THEN use the Spread operator to get the updates and override any attributes from the current expense
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            })
        default:
            return state;
    }
};

export default expensesReducer;