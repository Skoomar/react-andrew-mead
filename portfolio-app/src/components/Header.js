import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => (
    <header>
        <h1>Portfolio</h1>
        <NavLink to="/" className={({isActive}) => isActive ? 'is-active' : undefined }>Home</NavLink><br/>
        <NavLink to="/portfolio" className={({isActive}) => isActive ? 'is-active' : undefined }>Portfolio</NavLink><br/>
        <NavLink to="/contact" className={({isActive}) => isActive ? 'is-active' : undefined }>Contact</NavLink><br/>
    </header>
);

export default Header;