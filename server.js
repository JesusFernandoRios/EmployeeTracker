const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


// Starting Database Connection 
const connection = mysql.createConnection({
    //Selected Host
    host: "localhost",
    //Host Port
    port: 3306,
    //Selected user
    user: 'root',
    //Password
    password: "Wink26er!",
    //Select Database
    database: 'employee_tracker_db'
});


// Will create Functions for each option
function start() {
    inquirer.prompt({
        name: 'main_menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Departments, Roles and Employees', 'Add a Department, Role or Employee', 'Update Employee roles and Management', 'Delete Departments, roles or Employee Data']
    }).then(function(answer){
        console.log(answer)

        if(answer.main_menu === 'View Departments, Roles and Employees'){
            return choiceOne();
        }
        else if(answer.main_menu === 'Add a Department, Role or Employee'){
            return choiceTwo();
        }
    });
}

// function redo (){
//     inquirer.prompt({
//         name:'redo',
//         type:'list',
//         message:'What would you like to do next?',
//         choices: ['Go to Main Menu', 'Back']
//     }).then(function(answer){
//         console.log(answer)

//         if(answer.redo === 'Go to Main Menu'){
//             return start();
//         }
//         else if(answer.redo === 'Back'){
//             if(answer)
//         }
//     })
// }

// THIS FUNCTION CONTROLS THE PROMPTS FOR CHOICE ONE OF START FUNCTION
function choiceOne (){
    inquirer.prompt({
        name:'tableList',
        type:'list',
        message:'Please select the option you would like to see',
        choices:['Departments','Employee Roles','Employees','Return']
    }).then(function(answer){
        console.log(answer)
        if(answer.tableList === 'Departments'){
            
            connection.query('SELECT * FROM department', (err, results) => {
                if(err) throw err;

                console.table(results);

                choiceOne();
            })
            
        }
        else if(answer.tableList === 'Employee Roles'){
            
            connection.query('SELECT * FROM emp_role', (err, results) => {
                if(err) throw errl;

                console.table(results);

                choiceOne();
            })
        }
        else if(answer.tableList === 'Employees'){

            connection.query('SELECT * FROM employee', (err, results) => {
                if(err) throw err;

                console.table(results);

                choiceOne();
            })
        }
        else if(answer.tableList === 'Return'){
            return start();
        }
    })
}

function choiceTwo() {
    inquirer.prompt({
        name:'add',
        type:'list',
        message:'Please select the category you would like to add data to',
        choices:['Departments', 'Role', 'Employee','Return']
    }).then(function(answer){
        console.log(answer);

        if(answer.add === 'Departments'){
            
            inquirer.prompt({
                name:'dept',
                type:'input',
                message:'Add a new Department'
            }).then(function(answer){

                let dept = answer.dept;

                connection.query('INSERT INTO department (Dept_Name) VALUES (?)',[dept] ,(err, results) => {
                    if(err) throw err;

                    
                    if(!err){
                        console.table(results);
                        connection.query('Select * FROM department',(err,results)=>{
                            if(err) throw err;

                            console.table(results)

                            console.log('Departments Updated!')
                        })
                    }
                    else{
                        throw err
                    }
                })
            })
        }
        else if(answer.add === 'Role'){
           
            inquirer.prompt({
                name:'role',
                type:'input',
                message:'Add a new Employee Role (title)'
            }).then(function(answer){

                let role = answer.role;

                connection.query('INSERT INTO emp_role (Title) VALUES (?)',[role], (err, results)=>{
                    if(err) throw err;

                   inquirer.prompt({
                        name:'salary',
                        type:'number',
                        message:'Add Yearly Salary'
                    }).then(function(answer){

                        connection.query('UPDATE emp_role SET Salary = ? where title =?', [answer.salary, role],(err, results)=>{
                        if(err) throw err;

                            // console.table(results)
                        })
                        
                        inquirer.prompt({
                            name:'dept_ID',
                            type:'number',
                            message:'Select Department ID'
                        }).then(function(answer){
                        
                            connection.query('UPDATE emp_role SET Department_ID = ? where title =?', [answer.dept_ID, role],(err, results) =>{
                                if(err) throw err
    
                                connection.query('SELECT * FROM emp_role', (err, results) => {
                                    console.table(results)
                                    console.log('New Employee Position has been created!')

                                })
                            })
                        })
                    })

                })
                
            })
        }
    })
}

connection.connect(function(err){
    if(err){
        return err
    }
    console.log(' the server is running ');

    start();
})
