import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import AppRouter from "./routers/AppRouters";
import configureStore from "./store/configureStore";
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'
import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

const store = configureStore();

const jsx = (
    // Provider takes your Redux store as props
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)
// console.log(store.getState());

ReactDOM.render(jsx, document.getElementById('app'));
