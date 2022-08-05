import React from "react";
import moment from "moment";
import { SingleDatePicker} from "react-dates";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'

// calling moment() on it's own just straight up gives you an object containing the current point in time
// it also has a lot of functions you can call on it - can see all of them if you look in the console DevTools and look at the __proto__ for this object
// const now = moment();
// console.log(now.format('YYYY-MMM-Do'))

export default class ExpenseForm extends React.Component {
    state = {
        description: '',
        note: '',
        amount: '',
        createdAt: moment(),
        calendarFocused: false
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}))
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}));

        // if you want to just put the e.target.value into setState you have to do some more stuff
        // when we assign e.target.value to a variable first like above, the e.target runs straight away and gives the value
        // but if we put it in a callback e.g. this.setState(() => { e.target.value }) then it won't necessarily run straight away
        // what you can do is use e.persist which makes the values in e persist?
        // e.persist();
        // this.setState(() => ({ note: e.target.value});
        // i'm not sure why you'd want to do this as it's just a bit messy but at least I know it's possible
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        // regex to make sure there are maximum two digits after decimal point
        // the conditional on the setState makes it so that it automatically stops the user from entering more than 2 d.ps
        // because the value is a controlled input, value is taken from state.
        // If state doesn't update to the new value passed in, then the textbox won't update if user tries typing outside the parameters you've set the this.setState to occur in
        if (amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }))
        }
    }

    onDateChange = (createdAt) => {
        this.setState(() => ({ createdAt }))
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({calendarFocused: focused}))
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}