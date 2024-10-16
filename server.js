import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';

// Initializing Express App
const app = express();

// Database Connection
const sequelize = new Sequelize('mydatabase', 'Shinnamon', '123456789', {
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

// // Books Model
// const Books = sequelize.define('Books', {
//   BookID: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   BookName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   BookTypeID: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   BookPrice: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   Description: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   }
// }, {
//   tableName: 'Books',
//   timestamps: false
// });

// // Customers Model
// const Customers = sequelize.define('Customers', {
//   CustomerID: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   MemberID: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   CustomerName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   Sex: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   Age: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   Contact: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   Address: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   }
// }, {
//   tableName: 'Customers',
//   timestamps: false
// });

// // Members Model
// const Members = sequelize.define('Members', {
//   MemberID: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   Point: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   JoinDate: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   MembershipLevel: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   tableName: 'Members',
//   timestamps: false
// });

// // BookTypes Model
// const BookTypes = sequelize.define('BookTypes', {
//   BookTypeID: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   BookTypeName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   tableName: 'BookTypes',
//   timestamps: false
// });



// Sync Models with the Database
sequelize.sync().then(() => {
  console.log('Database & tables created!');
}).catch((error) => {
  console.error('Unable to create database:', error);
});

// Routes (ตัวอย่าง)
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export {BookStore};