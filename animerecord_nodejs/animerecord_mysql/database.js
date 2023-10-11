const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'animerecord',
  port: '3306'
});

module.exports = db;