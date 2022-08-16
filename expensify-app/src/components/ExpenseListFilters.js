import React from "react";
import {connect} from "react-redux";
import {DateRangePicker} from "react-dates";
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from "../actions/filters";

// A class-based component using Redux
// see how connect is used and how HOC is implemented

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.props.filters.text}
                    onChange={(e) => {
                        // every time the input box text is changed, we call the setTextFilter action to change the filter text in the Store
                        this.props.dispatch(setTextFilter(e.target.value))
                    }}
                />
                {/* create a dropdown to choose filters using <select>*/}
                <select value={this.props.filters.sortBy} onChange={(e) => {
                    if (e.target.value === "date") {
                        this.props.dispatch(sortByDate());
                    } else if (e.target.value === "amount") {
                        this.props.dispatch(sortByAmount());
                    }
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                {/*numberOfMonths set to 1 so only one calendar shows on the UI, not two. And isOutsideRange set to false otherwise that you can't enter dates that are previous to current date*/}
                <DateRangePicker
                    startDateId="RangePickerStart"
                    startDate={this.props.filters.startDate}
                    endDateId="RangePickerEnd"
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}


export default connect(mapStateToProps)(ExpenseListFilters);
