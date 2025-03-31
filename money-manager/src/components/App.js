import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import Categories from './Categories';
import Banks from './Banks';
import LoginPage from './LoginPage';

const App = () => {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/banks" element={<Banks />} />
      </Routes>
  );
};

export default App;
