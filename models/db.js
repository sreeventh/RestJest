import mysql from 'mysql2';
import { dbConfig } from '../config/db.config.js';

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// Open the connection to MySQL database
connection.connect(error => {
  if (error) throw error;
  console.log('------------------ Successfully connected to the database - Users ! ------------------');
});

// Function to close the database connection
// export const closeConnection = () => {
//   return new Promise((resolve, reject) => {
//     connection.end(err => {
//       if (err) reject(err);
//       else resolve();
//     });
//   });
// };

// Export database connection and close function
export default connection;
