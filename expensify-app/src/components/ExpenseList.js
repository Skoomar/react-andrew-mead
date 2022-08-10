import React from "react";
import {connect, useSelector} from 'react-redux';
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses"

const ExpenseList = () => {
    const expenses = useSelector(state => state.expenses);

    return (
        <div>
            <h1>Expense List</h1>
            {expenses.map((expense) => (
                <ExpenseListItem key={expense.id} {...expense} />
            ))}
        </div>
    )
}

export default ExpenseList;