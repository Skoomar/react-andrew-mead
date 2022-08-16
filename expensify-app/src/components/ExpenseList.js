import React from "react";
import {useSelector} from 'react-redux';
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses"

const ExpenseList = () => {
    const expenses = useSelector(state => state.expenses);
    const filters = useSelector(state => state.filters);
    const selectedExpenses = selectExpenses(expenses, filters);

    return (
        <div>
            <h1>Expense List</h1>
            {selectedExpenses.map((expense) => (
                <ExpenseListItem key={expense.id} {...expense} />
            ))}
        </div>
    )
}

export default ExpenseList;