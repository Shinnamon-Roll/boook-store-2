import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';

// Initializing Express App
const app = express();
app.use(express.json());

// Database Connection
const sequelize = new Sequelize('mydatabase', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
});

// BookStore Model
const BookStore = sequelize.define('BookStore', {
  SaleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CustomerID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  BookID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PurchaseDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'BookStore',
  timestamps: false
});

// Books Model
const Books = sequelize.define('Books', {
  BookID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  BookName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  BookTypeID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  BookPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Books',
  timestamps: false
});

// Customers Model
const Customers = sequelize.define('Customers', {
  CustomerID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  MemberID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CustomerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Sex: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Contact: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Address: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Customers',
  timestamps: false
});

// Members Model
const Members = sequelize.define('Members', {
  MemberID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Point: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  JoinDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  MembershipLevel: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Members',
  timestamps: false
});

// BookTypes Model
const BookTypes = sequelize.define('BookTypes', {
  BookTypeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  BookTypeName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'BookTypes',
  timestamps: false
});

// Create a book
app.post('/books', async (req, res) => {
  try {
    const newBook = await Books.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all books
app.get('/books', async (req, res) => {
  try {
    const books = await Books.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one book by id
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Books.findByPk(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a book
app.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Books.update(req.body, {
      where: { BookID: req.params.id }
    });
    if (updatedBook[0]) {
      res.status(200).json({ message: 'Book updated successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  try {
    const rowsDeleted = await Books.destroy({
      where: { BookID: req.params.id }
    });
    if (rowsDeleted) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sync Models with the Database
sequelize.sync().then(() => {
  console.log('Database & tables created!');
}).catch((error) => {
  console.error('Unable to create database:', error);
});

// Routes (Example)
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { BookStore, Members, Books, Customers, BookTypes };
