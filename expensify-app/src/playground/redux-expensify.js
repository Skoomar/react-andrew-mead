import { createStore, combineReducers } from "@reduxjs/toolkit";

const demoState = {
    expenses: [{
        id: 'blah',
        description: 'May Rent',
        note: 'final payment for address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};