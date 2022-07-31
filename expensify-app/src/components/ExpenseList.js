import React from "react";
import { connect } from 'react-redux';
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses"

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((expense) => (
            <ExpenseListItem key={expense.id} {...expense} />
        ))}
    </div>
)

// here we get what we want from our redux store (passed in as state) and return it as an object to be used as props for our wrapped component
const mapStateToProps = (state) => {
    return {
        // expenses: state.expenses,
        // filters: state.filters
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

// this returns the HOC which will call ExpenseList
// we use connect from react-redux to get access to our redux store
// inside connect() we define (or pass in) a function which lets us determine what info from the store we want our component to have access to - we pass the store's state as the first arg
// we put ExpenseList after the connect(...) because connect() returns a function (which we've defined)
    // That returned function is actually what we are passing ExpenseList into which will then return our HOC
    // just the way they've written it for whatever reason
export default connect(mapStateToProps)(ExpenseList);