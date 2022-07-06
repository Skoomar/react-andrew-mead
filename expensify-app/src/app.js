import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
    <div>
        This is from my dashboard component
    </div>
);

const AddExpensePage = () => (
    <div>
        This is from my add expense component
    </div>
);

const EditExpensePage = () => (
    <div>
        Edit expense page
    </div>
);

const HelpPage = () => (
    <div>
        Help Page
    </div>
);

const routes = (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ExpenseDashboardPage/>}/>
            <Route path="/create" element={<AddExpensePage/>}/>
            <Route path="/edit" element={<EditExpensePage/>}/>
            <Route path="/help" element={<HelpPage/>}/>
        </Routes>
    </BrowserRouter>
);


ReactDOM.render(routes, document.getElementById('app'));
