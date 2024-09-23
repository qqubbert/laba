drop database if exists lab;
create database lab;
use lab;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'spiritbinge';

-- TABLES

CREATE TABLE Users (
	ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    Login VARCHAR(100),
    Pass VARCHAR(100),
    Permission VARCHAR(100),
    RegDate TIMESTAMP DEFAULT(CURRENT_TIMESTAMP()) 
);

CREATE TABLE Employee (
    ID INT NOT NULL PRIMARY KEY UNIQUE,
    FirstName VARCHAR(30),
    LastName VARCHAR(30),
    Surname VARCHAR(30),
    Gender CHAR,
    Birthday DATE,
    FamilyStatus VARCHAR(50),
    HavingChildren INT,
    JobTitle VARCHAR(30),
    AcademicDegree VARCHAR(50),
    DepID INT,
    WorkExperience INT,
    Salary INT, 
	FOREIGN KEY (ID)
		REFERENCES Users (ID)
);

CREATE TABLE Contacts (
    Id_Employee INT,
    PhoneNumber VARCHAR(11),
    Email VARCHAR(50),
    FOREIGN KEY (Id_Employee)
        REFERENCES Employee (ID)
);

CREATE TABLE tasks (
    Id_Employee INT(10) NOT NULL PRIMARY KEY,
    Task TEXT,
    Progress INT(3),
    FOREIGN KEY (Id_Employee)
        REFERENCES Users (ID)
);

CREATE TABLE Departaments (
    DepID INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    DepTtl VARCHAR(100),
    ProjID INT(10)
);

CREATE TABLE DepartamentsEmployee (
    Id_Employee INT(10) NOT NULL,
    Dep_ID INT(10) NOT NULL,
    FOREIGN KEY (Id_Employee)
        REFERENCES Users (ID),
    FOREIGN KEY (Dep_ID)
        REFERENCES Departaments (DepID)
);

CREATE TABLE Projects (
    ProjID INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ProjTtl VARCHAR(100),
    Deadlines DATE,
    Budget INT,
    Requirements TEXT,
    Progress INT(3)
);

CREATE TABLE DepartamentsProj (
    Dep_ID INT(10) NOT NULL,
    Proj_ID INT(10) NOT NULL,
    FOREIGN KEY (Dep_ID)
        REFERENCES Departaments (DepID),
    FOREIGN KEY (Proj_ID)
        REFERENCES Projects (ProjID)
);

create Table article (
	id int auto_increment unique not null primary key,
    title varchar(100) not null,
    HtmlLink varchar(100),
    completed boolean,
    author_id int,
    creating_date TIMESTAMP DEFAULT(CURRENT_TIMESTAMP()),
    foreign key (author_id) references Users (ID)
);

create table article_tags (
	id int auto_increment unique not null primary key,
    article_id int,
    biology boolean,
    chemistry boolean,
    it boolean,
    physics boolean,
    foreign key (article_id) references article (id)
);

create table article_comms (
	id int auto_increment unique not null primary key,
    article_id int,
    author_id int,
    comm text,
    foreign key (article_id) references article (id),
	foreign key (author_id) references Users (ID)
);

create table chats (
	id int auto_increment unique not null primary key,
	title varchar(100)
);

create table chat_users (
	id int auto_increment unique not null primary key,
	user_id int,
    chat_id int,
    foreign key (user_id) references Users (ID),
    foreign key (chat_id) references chats (id)
);

create table chat_msgs (
	id int auto_increment unique not null primary key,
	chat_id int,
    sender_id int,
    msg text,
    msg_date TIMESTAMP DEFAULT(CURRENT_TIMESTAMP()),
    pinned boolean,
    foreign key (sender_id) references Users (ID),
    foreign key (chat_id) references chats (id)
);

create table msg_media (
	id int auto_increment unique not null primary key,
	msg_id int,
    file_link varchar(100),
    foreign key (msg_id) references chat_msgs (id)
);

create table fav_articles (
	id int auto_increment unique not null primary key,
	art_id int,
    user_id int,
    foreign key (user_id) references Users (ID),
    foreign key (art_id) references article (id)
);

-- DATA

-- INSERT INTO Employee (ID, FirstName, LastName, Surname, Gender, Birthday, FamilyStatus, HavingChildren, JobTitle, AcademicDegree, DepID, WorkExperience, Salary)
-- VALUES 
-- (1, 'Николай', 'Романович', 'Шебалков', 'M', '2005-08-25', 'Холост', 0, 'Лаборант', 'Кандидат наук', 1, 10, 100000),
-- (2, 'Александр', 'Павлович', 'Наумов', 'М', '2006-08-29', 'В активном поиске', 1, 'Уборщик', 'Образование отсутствует', 1, 13, 19242),
-- (3, 'Сергей', 'Сергеевич', 'Степцов', 'M', '2006-06-18', 'Холост', 0, 'Лаборант', 'Бакалавр', 1, 3, 44000),
-- (4, 'Василий', 'Витальевич', 'Блохин', 'M', '1985-05-17', 'Разведён', 5, 'Профессор', 'Доктор наук', 2, 10, 150000),
-- (5, 'Матвей', 'Павлович', 'Самойличенко', 'M', '2003-08-12', 'Разведён', 0, 'Уборщик', 'Среднее профессиональное орбазование', 2, 8, 70000),
-- (6, 'Дмитрий', 'Павлович', 'Шабанов', 'M', '2004-08-15', 'Холост', 0, 'Инженер', 'Среднее профессиональное орбазование', 2, 4, 90000),
-- (7, 'Владислав', 'Витальевич', 'Морозов', 'M', '2008-02-17', 'Холост', 0, 'Лаборант', 'Основное общее образование', 3, 2, 30000),
-- (8, 'Мирон', 'Максимович', 'Воронин', 'M', '2009-12-18', 'Холост', 0, 'Электрик', 'Основное общее образование', 3, 0, 10000),
-- (9, 'Вячеслав', 'Романович', 'Иванов', 'М', '1999-10-13', 'Женат', 3, 'Профессор', 'Образование отсутствует', 3, 6, 25000),
-- (10, 'Кристина', 'Витальевна', 'Ивичук', 'Ж', '2007-01-12', 'Вдова', 0, 'Химик', 'Аспирант', 4, 1, 15000),
-- (11, 'Владислав', 'Александрович', 'Воробьёв', 'М', '2006-12-24', 'Женат', 0, 'Администратор', 'Бакалавр', 5, 2, 65000),
-- (12, 'Артём', 'Витальевич', 'Шум', 'М', '2006-08-14', 'Женат', 2, 'Физик', 'Бакалавр', 5, 3, 55000),
-- (13, 'Игорь', 'Андреевич', 'Веденеев', 'М', '2006-10-14', 'Холост', 0, 'Физик', 'Аспирант', 5, 4, 75000),
-- (14, 'Алексей', 'Павлович', 'Пасечников', 'М', '2003-05-04', 'Холост', 0, 'Химик', 'Аспирант', 6, 2, 75000),
-- (15, 'Дмитрий', 'Владимирович', 'Лукьянов', 'М', '2007-05-13', 'Холост', 0, 'Лаборант', 'Аспирант', 6, 1, 65000),
-- (16, 'Кирилл', 'Иванович', 'Назаров', 'М', '2007-01-09', 'Женат', 0, 'Лаборант', 'Аспирант', 6, 0, 55000),
-- (17, 'Нурадиль', 'Азаматович', 'Хаджанов', 'М', '2006-04-18', 'Холост', 0, 'Уборщик', 'Среднее профессиональное орбазование', 6, 3, 15000),
-- (18, 'Святослав', 'Сергеевич', 'Несинов', 'М', '1998-07-13', 'Холост', 0, 'Физик', 'Среднее профессиональное орбазование', 7, 0, 15000),
-- (19, 'Даниил', 'Владимирович', 'Витков', 'М', '1995-02-28', 'Женат', 0, 'Профессор', 'Среднее профессиональное орбазование', 9, 0, 30000),
-- (20, 'Георгий', 'Артемович', 'Крючихин', 'М', '1984-12-02', 'Холост', 0, 'Математик', 'Среднее профессиональное орбазование', 7, 13, 29000),
-- (21, 'Егор', 'Андреевич', 'Лукьянов', 'М', '1990-01-17', 'Женат', 3, 'Математик', 'Среднее профессиональное орбазование', 8, 9, 19242),
-- (22, 'Дмитрий', 'Сергеевич', 'Корабельников', 'М', '1962-05-29', 'Женат', 5, 'Математик', 'Среднее профессиональное орбазование', 8, 19, 190242),
-- (23, 'Артур', 'Давидович', 'Петросян', 'М', '1990-11-02', 'Холост', 0, 'Физик', 'Аспирант', 8, 6, 89567),
-- (24, 'Даниель', 'Андреевич', 'Ни', 'М', '2006-03-04', 'Холост', 0, 'Лаборант', 'Аспирант', 9, 1, 63656),
-- (25, 'Даниил', 'Олегович', 'Сатюков', 'М', '2005-04-29', 'Женат', 0, 'Уборщик', 'Начальное общее образование', 9, 1, 3000),
-- (26, 'Данила', 'Александрович', 'Демидов', 'М', '1990-12-17', 'Холост', 0, 'Директор', 'Среднее профессиональное орбазование', 9, 24, 300000),
-- (27, 'Василиса', 'Андреевна', 'Бочнюк', 'Ж', '2006-09-04', 'Не замужем', 0, 'Старший научный сотрудник', 'Среднее профессиональное орбазование', 10, 1, 63050),
-- (28, 'Анастасия', 'Игоревна', 'Егорова', 'Ж', '2000-06-03', 'Замужем', 0, 'Лаборант', 'Среднее профессиональное орбазование', 10, 2, 30000),
-- (29, 'Дарья', 'Тарасовна', 'Назаренко', 'Ж', '2000-03-06', 'Не замужем', 0, 'Лаборант', 'Среднее профессиональное орбазование', 10, 1, 40000),
-- (30, 'Абдуджафис', 'Абдурасулович', 'Бободжанов', 'М', '1945-05-09', 'Женат', 6, 'Профессор', 'Доктор наук', 11, 50, 100000);

-- INSERT INTO Contacts (Id_Employee, PhoneNumber, Email)
-- VALUES
-- (1, '1234567890', 'lolkek.doe@example.com'),
-- (2, '9876543210', 'kekcheberek.doe@example.com'),
-- (3, '5556667777', 'michael.smith@example.com'),
-- (4, '4443332222', 'emily.jones@example.com'),
-- (5, '3335555444', 'garrys.mod@ksuf.com'),
-- (6, '8005553535', 'burila.skvazhin@skuf.com'),
-- (7, '7777777777', 'skufazavr777@skuf.ru'),
-- (7, '9999999999', 'skufazavr69n@skuf.com'),
-- (8, '3046708436', 'sgbdboujndfh@skuf.com'),
-- (9, '5774557458', 'bsdjbjbd@skuf.com'),
-- (10, '4373657868', 'nsd57kjnljxn@skuf.com'),
-- (11, '5377677658', 'sgfjmghmmcyh@skuf.com'),
-- (12, '4764536864', 'sdhgdkhv@skuf.com'),
-- (13, '43636876979', 'minecraftik@skuf.com'),
-- (14, '47697898870', 'xgfjnncx@gmail.com'),
-- (15, '58757484679', 'vvvvvsdvfds@mail.ru'),
-- (16, '54765876989', 'dsgsdgs@mail.com'),
-- (16, '54765878799', 'vsdgvdesg@mail.com'),
-- (16, '45877877879', 'fgxmdfnfd@mail.com'),
-- (17, '55547645754', 'fghjklmjhgdfsdas@mail.com'),
-- (18, '12345678965', 'qwerty@mail.com'),
-- (19, '14327654776', 'q1w2e3r4t5y6@mail.ru'),
-- (20, '43654765867', 'sdgfxdhjfm@mail.com'),
-- (21, '32545756868', 'bdfhbfrd@mail.ru'),
-- (22, '43663464565', 'dsvgssdd@gmail.com'),
-- (23, '23564587656', 'dfnjgfnjgf@gmail.com'),
-- (24, '43645765765', 'gggggggg@gmail.com'),
-- (25, '23465476576', 'agsfhdxb@mail.com'),
-- (26, '43645865876', 'berrgbht55d@gmail.com'),
-- (27, '45756985868', 'sdgdfhbfd@gmail.com'),
-- (28, '34675856686', 'cewfcecegr@mail.com'),
-- (29, '43654876979', 'tgtgtgtgt@ggmail.com'),
-- (30, '54765868868', 'fffffsdfsa@gmail.com');

-- INSERT INTO tasks (Id_Employee, Task, Progress)
-- VALUES
-- (23, 'Написание шуток про диффузию', 50),
-- (27, 'Изучение артефактов', 80),
-- (2, 'Уборка химикатов', 30),
-- (16, 'Печать докладов', 60),
-- (1, 'Изготовление лекарств', 22),
-- (10, 'Варка препаратов', 77),
-- (7, 'Написание доклада по фармакологии', 82),
-- (3, 'Обучение новых сотрудников', 38),
-- (12, 'Изучение организма у кошачих', 59),
-- (6, 'Бурение скважин', 98),
-- (14, 'Изучение химических элементов', 42),
-- (20, 'Повышение квалификации', 17),
-- (26, 'Формирование отчёта о расходах', 99);

-- INSERT INTO Departaments (DepTtl, ProjID)
-- VALUES
-- ('Отдел биохимических исследований', 1),
-- ('Отдел молекулярной биологии', 2),
-- ('Отдел генетических исследований', 3),
-- ('Отдел нанотехнологий и материаловедения', 4),
-- ('Отдел клинических испытаний и фармакологии', 5),
-- ('Отдел экологических исследований', 6),
-- ('Отдел психологических и социологических исследований', 7),
-- ('Отдел инженерии и разработки', 8),
-- ('Отдел физики и астрономии', 9),
-- ('Отдел информационных технологий и компьютерных наук', 10),
-- ('Отдел пищевых технологий и агрономии', 11);

-- INSERT INTO Projects (ProjTtl, Deadlines, Budget, Requirements, Progress)
-- VALUES
-- ('Исследование воздействия на организм', '2024-12-31', 1000000, 'Образцы материалов для исследования', 10),
-- ('Исследование генетических мутаций', '2024-11-30', 800000, 'Оборудование для секвенирования ДНК', 20),
-- ('Разработка новых методов лечения', '2024-10-31', 1200000, 'Лабораторное оборудование и химические реактивы', 30),
-- ('Создание наноматериалов для медицины', '2024-09-30', 1500000, 'Оборудование для нанотехнологических исследований', 40),
-- ('Клинические испытания препаратов', '2024-08-31', 2000000, 'Участники для клинических испытаний', 50),
-- ('Оценка экологических последствий', '2024-07-31', 500000, 'Лабораторное оборудование для анализа образцов', 60),
-- ('Исследование социальных аспектов здоровья', '2024-06-30', 700000, 'Опросники и статистические данные', 70),
-- ('Разработка инженерных систем', '2024-05-31', 900000, 'Инженерное оборудование и программное обеспечение', 80),
-- ('Исследование космических объектов', '2024-04-30', 1300000, 'Телескопы и оборудование для астрономических наблюдений', 90),
-- ('Разработка новых информационных технологий', '2024-03-31', 1600000, 'Компьютеры и программное обеспечение', 100),
-- ('Улучшение сельскохозяйственных методов', '2024-02-29', 1100000, 'Сельскохозяйственное оборудование и семена', 90);

-- INSERT INTO DepartamentsProj (Dep_ID, Proj_ID)
-- VALUES
-- (1, 1),
-- (2, 2),
-- (3, 3),
-- (4, 4),
-- (5, 5),
-- (6, 6),
-- (7, 7),
-- (8, 8),
-- (9, 9),
-- (10, 10),
-- (11, 11);

-- INSERT INTO DepartamentsEmployee (Id_Employee, Dep_ID)
-- VALUES
-- (1, 1),
-- (2, 1),
-- (3, 1),
-- (4, 2),
-- (5, 2),
-- (6, 2),
-- (7, 3),
-- (8, 3),
-- (9, 3),
-- (10, 4),
-- (11, 5),
-- (12, 5),
-- (13, 5),
-- (14, 6),
-- (15, 6),
-- (16, 6),
-- (17, 6),
-- (18, 7),
-- (19, 7),
-- (20, 7),
-- (21, 8),
-- (22, 8),
-- (23, 8),
-- (24, 9),
-- (25, 9),
-- (26, 9),
-- (27, 10),
-- (28, 10),
-- (29, 10),
-- (30, 11);
