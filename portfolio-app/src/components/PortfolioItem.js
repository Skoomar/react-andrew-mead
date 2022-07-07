import React from "react";
import {useParams} from "react-router-dom";

const PortfolioItem = () => {
    let { id } = useParams();

    return (
        <div>
            Page for item with id of { id }
        </div>
    );
}

export default PortfolioItem;