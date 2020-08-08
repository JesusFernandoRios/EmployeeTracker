USE employee_tracker_DB;


insert into department ( id, Dept_Name) Values (1, 'Dept_Ex');

insert into department ( id, Dept_Name) Values (2, 'Dept_Ex2');

insert into department ( id, Dept_Name) Values (3, 'Dept_Ex3');

insert into department ( id, Dept_Name) Values (4, 'Dept_Ex4');


-- mysql> describe emp_role;
-- +---------------+---------------+------+-----+---------+-------+
-- | Field         | Type          | Null | Key | Default | Extra |
-- +---------------+---------------+------+-----+---------+-------+
-- | ID            | int           | NO   | PRI | NULL    |       |
-- | Title         | varchar(30)   | YES  |     | NULL    |       |
-- | Salary        | decimal(10,2) | YES  |     | NULL    |       |
-- | Department_ID | int           | YES  |     | NULL    |       |
-- +---------------+---------------+------+-----+---------+-------+


insert into emp_Role (ID, Title, Salary, Department_ID) values (1, 'Developer', 50000, 1);

insert into emp_Role (ID, Title, Salary, Department_ID) values (2, 'Accountant', 36000, 2);

insert into emp_Role (ID, Title, Salary, Department_ID) values (3, 'Marketing', 37000, 3);

insert into emp_Role (ID, Title, Salary) values (4, 'Manager', 55000);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (10, 'clark', 'kent', 1, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (11, 'bruce', 'wayne', 1, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (12, 'peter', 'parker', 2, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (13, 'tony', 'stark', 2, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (14, 'steve', 'rogers', 3, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (15, 'bruce', 'banner', 3, 7);

INSERT INTO employee (id, first_name, last_name, role_id) VALUES (20, 'reed', 'richards', 4);

INSERT INTO employee (id, first_name, last_name, role_id) VALUES (21, 'barry', 'allen', 4);

INSERT INTO employee (id, first_name, last_name, role_id) VALUES (22, 'dick', 'grayson', 4);

select * from employee;
