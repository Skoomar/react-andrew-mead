import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import AppRouter from "./routers/AppRouters";
import configureStore from "./store/configureStore";
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

const store = configureStore();

store.dispatch(addExpense({description: 'Water bill', amount: 50, createdAt: 100}));
store.dispatch(addExpense({description: 'Gas bill', createdAt: 1000}));
store.dispatch(addExpense({description: 'Rent', amount: 1095}));
store.dispatch(setTextFilter(''));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
    // Provider takes your Redux store as props
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)
// console.log(store.getState());

ReactDOM.render(jsx, document.getElementById('app'));
