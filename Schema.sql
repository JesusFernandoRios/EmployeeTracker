DROP DATABASE IF EXISTS employee_tracker_DB;

CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE department (
    ID INT Primary KEY,
    Dept_Name VARCHAR(30)
);

CREATE TABLE Emp_Role (
    ID INT PRIMARY KEY,
    Title VARCHAR(30),
    Salary DECIMAL(10,2),
    Department_ID INT
);

CREATE TABLE Employee (
    ID INT PRIMARY KEY,
    First_Name VARCHAR(30),
    Last_Name VARCHAR(30),
    Role_ID INT,
    Manager_ID INT NULL
);



