import React from 'react';
import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Portfolio from "../components/Portfolio";
import PortfolioItem from "../components/PortfolioItem";
import Contact from "../components/Contact";
import NotFound from "../components/NotFound";


const AppRouter = () => (
    <BrowserRouter>
        {/* Putting a component outside the <Routes> section will render it at the top of every page. Good for title/navigation bars etc */}
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<PortfolioItem />} />
            <Route path="/contact" element={<Contact />} />
            {/* this routes to anything that isn't in the above routes. Use this for 404 Not Found stuff */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
);

export default AppRouter;