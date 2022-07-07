import React from "react";
import {useParams} from "react-router-dom";

const EditExpense = () => {
    let params = useParams();

    return (
        <div>
            Edit expense page with id of {params.id}
        </div>
    );
}

export default EditExpense;