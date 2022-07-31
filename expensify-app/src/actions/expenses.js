import {v4 as uuid} from "uuid";

export const addExpense = (
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
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id // pass in the id of the expense we want to remove
})

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})