import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellBook = () => {
  const [books, setBooks] = useState([]);
  const [customerID, setCustomerID] = useState('');
  const [selectedBookID, setSelectedBookID] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const sellBook = async () => {
    try {
      await axios.delete(`http://localhost:3000/books/${selectedBookID}`);
      alert('Book sold successfully!');
      fetchBooks(); // Refresh the list
    } catch (error) {
      console.error('Error selling book:', error);
    }
  };

  return (
    <div>
      <h2>Sell Book</h2>
      <div>
        <label>Select Book to Sell:</label>
        <select value={selectedBookID} onChange={(e) => setSelectedBookID(e.target.value)}>
          <option value="">-- Select a Book --</option>
          {books.map((book) => (
            <option key={book.BookID} value={book.BookID}>
              {book.BookName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Enter Customer ID:</label>
        <input
          type="text"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
        />
      </div>
      <button onClick={sellBook}>Sell Book</button>
      <button><a href="/">Go Back</a></button>
    </div>
  );
};

export default SellBook;
