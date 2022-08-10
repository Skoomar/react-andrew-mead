import React from "react";
import {connect} from "react-redux";
import {removeExpense} from "../actions/expenses";
import {Link} from "react-router-dom";

// remember we can destructure props instead of having to do props.amount etc
const ExpenseListItem = ({id, description, amount, createdAt, dispatch}) => (
    <div>
        <Link to={`edit/${id}`}><h3>{description}</h3></Link>
        <p>Amount: {amount}</p>
        <p>Created At: {createdAt}</p>

    </div>
);

export default connect()(ExpenseListItem);