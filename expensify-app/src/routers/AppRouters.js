import React from 'react';
import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import Header from "../components/Header";
import ExpenseDashboard from "../components/ExpenseDashboard";
import AddExpense from "../components/AddExpense";
import EditExpense from "../components/EditExpense";
import Help from "../components/Help";
import NotFound from "../components/NotFound";


const AppRouter = () => (
    <BrowserRouter>
        {/* Putting a component outside the <Routes> section will render it at the top of every page. Good for title/navigation bars etc */}
        <Header />
        <Routes>
            <Route path="/" element={<ExpenseDashboard/>}/>
            <Route path="/create" element={<AddExpense/>}/>
            <Route path="/edit" element={<EditExpense/>}/>
            <Route path="/help" element={<Help/>}/>
            {/* this routes to anything that isn't in the above routes. Use this for 404 Not Found stuff */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
);

export default AppRouter;