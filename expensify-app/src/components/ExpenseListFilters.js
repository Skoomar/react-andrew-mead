import React from "react";
import {connect} from "react-redux";
import {setTextFilter, sortByAmount, sortByDate} from "../actions/filters";

const ExpenseListFilters = (props) => (
    <div>
        <input
            type="text"
            value={props.filters.text}
            onChange={(e) => {
                // every time the input box text is changed, we call the setTextFilter action to change the filter text in the Store
                props.dispatch(setTextFilter(e.target.value))
            }}
        />
        {/* create a dropdown to choose filters using <select>*/}
        <select value={props.filters.sortBy} onChange={(e) => {
            if (e.target.value === "date") {
                props.dispatch(sortByDate());
            } else if (e.target.value === "amount") {
                props.dispatch(sortByAmount());
            }
        }}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters);