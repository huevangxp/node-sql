const mysql = require('mysql2')
const util = require('util');

const Conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'crud'
})

Conn.connect((error) => {
    if (error) {
        return console.log(error);
    }
    console.log('Successfully connected to the database.');
});

const query = util.promisify(Conn.query).bind(Conn);
module.exports = query;