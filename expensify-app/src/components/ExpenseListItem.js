import React from "react";
import {connect} from "react-redux";
import {removeExpense} from "../actions/expenses";

// remember we can destructure props instead of having to do props.amount etc
const ExpenseListItem = ({id, description, amount, createdAt, dispatch}) => (
    <div>
        <h3>{description}</h3>
        <p>Amount: {amount}</p>
        <p>Created At: {createdAt}</p>
        <button
            onClick={(e) => {
               dispatch(removeExpense({ id }))
            }}
        >Remove
        </button>
    </div>
);

export default connect()(ExpenseListItem);