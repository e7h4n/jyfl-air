var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '192.168.2.240',
    user: 'pw',
    password: 'home123',
    database: 'air'
});

module.exports = pool;
