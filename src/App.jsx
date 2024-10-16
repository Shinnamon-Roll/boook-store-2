import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ BookName: '', BookTypeID: '', BookPrice: '', Description: '' });
  const [editingBook, setEditingBook] = useState(null);

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

  const addBook = async () => {
    try {
      await axios.post('http://localhost:3000/books', newBook);
      fetchBooks(); // Refresh the book list
      setNewBook({ BookName: '', BookTypeID: '', BookPrice: '', Description: '' });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateBook = async (id) => {
    try {
      await axios.put(`http://localhost:3000/books/${id}`, editingBook);
      fetchBooks(); // Refresh the book list
      setEditingBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h1>Bookstore</h1>

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
      </div>

      <div>
        <h2>Books List</h2>
        {books.map((book) => (
          <div key={book.BookID}>
            {editingBook?.BookID === book.BookID ? (
              <div>
                <input
                  type="text"
                  value={editingBook.BookName}
                  onChange={(e) => setEditingBook({ ...editingBook, BookName: e.target.value })}
                />
                <button onClick={() => updateBook(book.BookID)}>Save</button>
              </div>
            ) : (
              <div>
                <h3>{book.BookName}</h3>
                <p>Type ID: {book.BookTypeID}</p>
                <p>Price: ${book.BookPrice}</p>
                <p>{book.Description}</p>
                <button onClick={() => setEditingBook(book)}>Edit</button>
                <button onClick={() => deleteBook(book.BookID)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
