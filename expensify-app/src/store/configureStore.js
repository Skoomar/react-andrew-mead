import {combineReducers, createStore} from "@reduxjs/toolkit";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";

export default () => {

    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
        })
    );
    return store;
};
