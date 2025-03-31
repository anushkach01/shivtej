import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className='sideSection'>
            <ul>
                <li>
                    <h4>MENU</h4>
                </li>
                <ul>
                    <ul className='unorderList' onClick={() => navigate('/dashboard')}>Dashboard</ul>
                    <ul className='unorderList' onClick={() => navigate('/transactions')}>Transactions</ul>
                    <ul className='unorderList' onClick={() => navigate('/categories')}>Categories</ul>
                    <ul className='unorderList' onClick={() => navigate('/banks')}>Banks</ul>
                </ul>
                <li>
                    <h4>ACCOUNT</h4>
                    <ul></ul>
                </li>

            </ul>
        </div>

    );
};

export default Sidebar;