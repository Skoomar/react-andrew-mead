import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import {editExpense, removeExpense} from "../actions/expenses";
import {useDispatch, useSelector} from "react-redux";

// USING connect()() IS THE OLD WAY OF USING REDUX - NOW WE CAN JUST USE useDispatch & useSelector
// it's so much easier - no need for all that HOC shite
// TODO: change the other components to remove shite connect() and put in useDispatch/useSelector instead

const EditExpense = (props) => {
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