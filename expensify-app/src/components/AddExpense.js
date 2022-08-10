import React from "react"
import {connect, useDispatch} from "react-redux";
import { addExpense } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";
import { useNavigate } from 'react-router-dom'

const AddExpense = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={(expense) => {
            dispatch(addExpense(expense))
            navigate('/')
        }} />
    </div>
    )
};

export default AddExpense;