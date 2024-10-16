import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2 className='Text1'>Welcome to the Bookstore Management System</h2>
      <p>Select an action below:</p>
      <button><Link to="/add-book">Add New Book</Link></button>
      <button><Link to="/sell-book">Sell Book</Link></button>
    </div>
  );
};

export default HomePage;
