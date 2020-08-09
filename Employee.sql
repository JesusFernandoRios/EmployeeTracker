use employee_tracker_db;

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