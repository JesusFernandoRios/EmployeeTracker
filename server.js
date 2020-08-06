const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


// Starting Database Connection 
const connection = mysql.createConnection({
    host: "localhost",

    //Host Port
    port: 3000,

    //Selected user
    user: 'root',

    password: "Wink26er!",

    //Select Database
    database: 'employee_tracker_DB'

});

const mysqlTable = connection.query('SELECT * FROM department')

const table = cTable.getTable(mysqlTable)

console.log(table)

// Will create Functions for each option

connection.connect(function(err){

})