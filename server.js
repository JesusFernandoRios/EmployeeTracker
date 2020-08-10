const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Choices = require('inquirer/lib/objects/choices');


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
        choices: ['View Departments, Roles and Employees', 'Add a Department, Role or Employee', 'Update Employee role', 'Delete Departments, roles or Employee Data']
    }).then(function(answer){

        if(answer.main_menu === 'View Departments, Roles and Employees'){
            return choiceOne();
        }
        else if(answer.main_menu === 'Add a Department, Role or Employee'){
            return choiceTwo();
        }
        else if(answer.main_menu === 'Update Employee role'){
            return choiceThree();
        }
        else if(answer.main_menu === 'Delete Departments, roles or Employee Data'){
            return choiceFour();
        }
    });
}

// THIS FUNCTION CONTROLS THE PROMPTS FOR CHOICE ONE OF START FUNCTION
function choiceOne(){
    inquirer.prompt({
        name:'tableList',
        type:'list',
        message:'Please select the option you would like to see',
        choices:['Departments','Employee Roles','Employees','Return']
    }).then(function(answer){
        
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

                            choiceTwo();
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
                                    if(err) throw err;

                                    console.table(results)

                                    console.log('New Employee Position has been created!')

                                    choiceTwo();

                                })
                            })
                        })
                    })

                })
                
            })
        }
        else if(answer.add === 'Employee'){
            
            inquirer.prompt([
                {
                    name:'first',
                    type:'input',
                    message:'Please Enter New Employees first Name.'
                },
                {
                    name:'last',
                    type:'input',
                    message:'Enter Last Name.'
                },
                {
                    name:'role',
                    type:'number',
                    message:'Enter Role ID.'
                },
            ]).then(function(answer){
                console.log(answer);

                connection.query('INSERT INTO employee (First_Name, Last_Name, Role_ID) VALUES (?,?,?)', [answer.first, answer.last, answer.role], (err, results)=>{
                    if(err) throw err;

                    connection.query('SELECT First_Name, Last_Name FROM employee',(err, results)=> {
                        if(err) throw err;

                        console.table(results)

                        console.log('New Employee Added!')

                        choiceTwo();
                    })
                })
            })
        }
        else if(answer.add === 'Return'){
            return start();
        }
    })
}

function choiceThree() {
    
    connection.query("SELECT * FROM employee", (err, results) =>{
        if(err) throw err;

        console.table(results)

        inquirer.prompt([
        {
            name:'update',
            type:'number',
            message:'Select (by ID) the employee you would like to Update.'
        },
        {
            name:'role',
            type:'number',
            message:'Now input the department ID you wish to assign to employee.'
        }
        ])
        .then(function(answer){
            
            connection.query("UPDATE employee SET Role_ID = ? WHERE id = ?;",[answer.role, answer.update], (err, results) =>{
                if(err) throw err;

                connection.query('SELECT id, First_Name, Last_Name, Role_ID FROM employee WHERE id = ?;',[answer.update],(err, results) =>{
                    if(err) throw err;
                    
                    console.table(results)

                    console.log('Employee has been Updated!')

                    start();
                })
                
            })
            
        })

    })
    
}

function choiceFour() {

    inquirer.prompt({
        name:'delete',
        type:'list',
        message:'Select what you would like to Delete',
        choices:['Departments', 'Roles', 'Employees', 'Return']
    }).then(function(answer){

        console.log(answer);

        if(answer.delete === 'Departments'){

            connection.query("SELECT * FROM department", (err, results) =>{
                if(err) throw err
                
                console.table(results);

                inquirer.prompt({
                    name:'select',
                    type:'input',
                    message:'Type the desired Department to be deleted'
                }).then(function(answer){
                    console.log(answer)

                    connection.query('DELETE FROM department WHERE Dept_Name =?;',[answer.select],(err, results) =>{
                        if(err) throw err;
                        
                        console.table(results);
                        console.log('Department had been deleted!')

                        choiceFour();
                    })
                })
                
            })
        }
        else if(answer.delete === 'Roles'){

            connection.query('SELECT * FROM emp_role', (err,results) =>{
                if(err) throw err;

                console.table(results);

                inquirer.prompt({
                    name:'select',
                    type:'number',
                    message:'Type the desired Role to be deleted by ID'
                }).then(function(answer){
                    console.log(answer)

                    connection.query('DELETE FROM emp_role WHERE id =?;',[answer.select],(err, results) =>{
                        if(err) throw err;
                        
                        console.table(results);
                        console.log('Employee Role had been deleted!')

                        choiceFour();
                    })
                })
            })
        }
        else if(answer.delete === 'Employees'){

            connection.query('SELECT * FROM employee', (err, results) =>{
                if(err) throw err;

                console.table(results);

                inquirer.prompt({
                    name:'select',
                    type:'number',
                    message:'Enter the employee you would like to delete by ID'
                }).then(function(answer){

                    connection.query('DELETE FROM employee WHERE id = ?;',[answer.select], (err, results) =>{
                        if(err) throw err;

                        console.table(results);
                        console.log('Employee has been deleted')

                        choiceFour();
                    })
                })

            })
        }
        else if(answer.delete === 'Return'){
            return start();
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
