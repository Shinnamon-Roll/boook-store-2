import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddBook from './AddBook';
import SellBook from './SellBook';
import HomePage from './HomePage';
import './App.css'; // Your CSS file

const App = () => (
  <Router>
    <div className="app-container">
      <h1>Bookstore Management</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/add-book">Add Book</Link> | 
        <Link to="/sell-book">Sell Book</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/sell-book" element={<SellBook />} />
      </Routes>
    </div>
  </Router>
);

export default App;
