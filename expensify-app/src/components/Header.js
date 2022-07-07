import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" className={({isActive}) => isActive ? 'is-active' : undefined }>Homepage</NavLink><br/>
        <NavLink to="/create" className={({isActive}) => isActive ? 'is-active' : undefined }>Create Expense</NavLink><br/>
        <NavLink to="/edit" className={({isActive}) => isActive ? 'is-active' : undefined }>Edit Expense</NavLink><br/>
        <NavLink to="/help" className={({isActive}) => isActive ? 'is-active' : undefined }>Help</NavLink><br/>
    </header>
);

export default Header;