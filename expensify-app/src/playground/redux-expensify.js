import {createStore, combineReducers} from "@reduxjs/toolkit";
import {v4 as uuid} from 'uuid';

const addExpense = (
    // destructuring way of passing parameters to action generator
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        // generate a new ID for the expense entry
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// {id} - destructure the id attribute from the expense object passed in
// = {} - default empty object
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id // pass in the id of the expense we want to remove
})

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

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


const setTextFilter = (text = '') => ({
    type: 'SET_TEXT',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
})

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT':
            // ES6 operator and overriding of text attribute
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

// prints out expenses matching the current filters
// destructure the filters object
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
   return expenses.filter((expense) => {
       const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
       const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
       const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

       return startDateMatch && endDateMatch && textMatch;
   // use Array.prototype.sort to sort the expense data returned above. Need to provide our own compare function so that .sort knows how to sort our data
   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
   }).sort((a, b) => {
      if (sortBy === 'date') {
          // custom compare functions must return a 1 or -1 to let .sort know which item to put first
          return a.createdAt < b.createdAt ? 1 : -1;
      }
      else if (sortBy === 'amount') {
          return a.amount < b.amount ? 1 : -1;
      }
   });
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
    // console.log(store.getState());
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 100, createdAt: -1000 }));

// can get the value returned from the reducer
// console.log(expenseOne);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}))
store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
//
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());

// example of using ES6 spread operator with objects
// const user = {
//     name: 'Bruh',
//     age: 20
// };
//
// console.log({
//     ...user,
//     location: 'Philly',
//     // override age attribute from user
//     age: 27
// })

// This is how it would be if you only had one reducer for everything
// see how much nicer it looks when we do it using combineReducers like above
// const demoState = {
//     expenses: [{
//         id: 'blah',
//         description: 'May Rent',
//         note: 'final payment for address',
//         amount: 54500,
//         createdAt: 0
//     }],
//     filters: {
//         text: 'rent',
//         sortBy: 'amount', // date or amount
//         startDate: undefined,
//         endDate: undefined
//     }
// };