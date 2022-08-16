import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import {editExpense, removeExpense} from "../actions/expenses";
import {useDispatch, useSelector} from "react-redux";

const EditExpense = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expenses);

    const expense = expenses.find((expense) => expense.id === id);

    return (
        <div>
            <ExpenseForm
                expense={expense}
                onSubmit={(expense) => {
                    dispatch(editExpense(id, expense));
                    navigate('/')
                }}
            />
            <button
                onClick={(e) => {
                    dispatch(removeExpense({id}))
                    navigate('/')
                }}
            >Remove
            </button>
        </div>
    );
}

export default EditExpense;