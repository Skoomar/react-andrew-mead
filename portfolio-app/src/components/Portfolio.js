import React from "react";
import {NavLink} from "react-router-dom";

const Portfolio = () => (
    <div>
        <h1>My Work</h1>
        <p>Check out the following things I've done:</p>
        <NavLink to="/portfolio/1" className={({isActive}) => isActive ? 'is-active' : undefined }>Item One</NavLink><br/>
        <NavLink to="/portfolio/2" className={({isActive}) => isActive ? 'is-active' : undefined }>Item Two</NavLink><br/>
    </div>
);

export default Portfolio;