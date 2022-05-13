INSERT INTO departments (name) 
VALUES 
    ('Administration'),
    ('Operations'),
    ('Research and development'),
    ('Marketing'),
    ('Sales'),
    ('Human resources'),
    ('Customer service'),
    ('Accounting'),
    ('Finance'),
    ('IT');

INSERT INTO roles (title, salary, department_id) 
VALUES 
    ('Data Entry', 80040, 1),
    ('DevOps Engineer', 80041, 2),
    ('Computer Programmer', 80042, 3),
    ('Network Administrator', 80043, 4),
    ('IS Analyst', 80044, 5),
    ('AI Engineer', 80045, 6),
    ('Cloud Architect', 80046, 7),
    ('IT Manager', 80047, 8),
    ('Technical Specialist', 80048, 9),
    ('Application Developer', 80049, 10);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('James', 'Fraser', 1, NULL),
    ('Jack', 'London', 2, 4),
    ('Robert', 'Bruce', 3, 2),
    ('Peter', 'Greenaway', 4, 1),
    ('Derek', 'Jarman', 5, 1),
    ('Paolo', 'Pasolini', 6, 1),
    ('Heathcote', 'Williams', 7, 4),
    ('Sandy', 'Powell', 8, 4),
    ('Robert', 'London', 9, 3),
    ('Derek', 'Williams', 10, 3);