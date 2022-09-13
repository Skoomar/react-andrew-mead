import React from "react";
import {Link} from "react-router-dom";
import moment from 'moment';
import numeral from 'numeral';

// remember we can destructure props instead of having to do props.amount etc
const ExpenseListItem = ({id, description, amount, createdAt }) => {

    return (
        <div>
            <Link to={`edit/${id}`}><h3>{description}</h3></Link>
            <p>Amount: {numeral(amount).format('$0,0.00')}</p>
            <p>Created At: {moment(createdAt).format('Do MMM, YYYY')}</p>

        </div>
    );
}

export default ExpenseListItem;