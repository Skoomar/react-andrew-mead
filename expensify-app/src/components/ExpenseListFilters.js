import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {setTextFilter, sortByAmount, sortByDate} from "../actions/filters";

const ExpenseListFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters)

    return (
        <div>
            <input
                type="text"
                value={filters.text}
                onChange={(e) => {
                    // every time the input box text is changed, we call the setTextFilter action to change the filter text in the Store
                    dispatch(setTextFilter(e.target.value))
                }}
            />
            {/* create a dropdown to choose filters using <select>*/}
            <select value={filters.sortBy} onChange={(e) => {
                if (e.target.value === "date") {
                    dispatch(sortByDate());
                } else if (e.target.value === "amount") {
                    dispatch(sortByAmount());
                }
            }}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
        </div>
    );
}

export default ExpenseListFilters;