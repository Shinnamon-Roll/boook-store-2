import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [newBook, setNewBook] = useState({ BookName: '', BookTypeID: '', BookPrice: '', Description: '' });

  const addBook = async () => {
    // Basic validation
    if (!newBook.BookName || !newBook.BookTypeID || !newBook.BookPrice) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/books', newBook);
      alert('Book added successfully!');
      setNewBook({ BookName: '', BookTypeID: '', BookPrice: '', Description: '' }); // Reset form
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book: ' + error.response?.data?.error || error.message); // Show error message
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <input
        type="text"
        placeholder="Book Name"
        value={newBook.BookName}
        onChange={(e) => setNewBook({ ...newBook, BookName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Book Type ID"
        value={newBook.BookTypeID}
        onChange={(e) => setNewBook({ ...newBook, BookTypeID: e.target.value })}
      />
      <input
        type="number"
        placeholder="Book Price"
        value={newBook.BookPrice}
        onChange={(e) => setNewBook({ ...newBook, BookPrice: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newBook.Description}
        onChange={(e) => setNewBook({ ...newBook, Description: e.target.value })}
      />
      <button onClick={addBook}>Add Book</button>
      <button><a href="/">Go Back</a></button>
    </div>
  );
};

export default AddBook;
