import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test('Should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('Should remove expense by ID', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expenses if ID not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('Should add an expense', () => {
    const expense = {
        id: '100',
        description: 'new expense',
        note: '',
        amount: 100,
        createdAt: 0
    };

    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test('Should edit an expense', () => {
    const note = 'yeet';
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            note
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state[1].note).toEqual(note)
})

test('Should not edit expense if expense ID not found', () => {
    const note = 'false ID';
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            note
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})