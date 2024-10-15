drop database if exists lab;
create database lab;
use lab;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'spiritbinge';

-- TABLES

CREATE TABLE Departaments (
    DepID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    DepTtl VARCHAR(100),
    ProjID INT
);

CREATE TABLE Users (
	ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    Login VARCHAR(100),
    Pass VARCHAR(100),
    Permission VARCHAR(100),
    FirstName VARCHAR(30) DEFAULT("Имя"),
    LastName VARCHAR(30)DEFAULT("Фамилия"),
    Surname VARCHAR(30) DEFAULT("Отчество"),
    Gender CHAR,
    Birthday DATE,
    FamilyStatus VARCHAR(50) DEFAULT("Семейный статус"),
    HavingChildren INT DEFAULT(0),
    JobTitle VARCHAR(30)DEFAULT("Должность"),
    AcademicDegree VARCHAR(50) DEFAULT("Учёная степень"),
    DepID INT,
    WorkExperience INT DEFAULT(0),
    Salary INT DEFAULT(0),
    PhoneNumber VARCHAR(11) DEFAULT("88005553535"),
    Email VARCHAR(50) UNIQUE DEFAULT("example@mail.com"),
    Isblocked bool DEFAULT(false),
    ProfilePicLink VARCHAR(100) DEFAULT(""),
    FOREIGN KEY (DepID)
        REFERENCES Departaments (DepID)
);

CREATE TABLE tasks (
	ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Id_Employee INT,
    Task TEXT,
    Progress INT,
    FOREIGN KEY (Id_Employee)
        REFERENCES Users (ID)
);

CREATE TABLE Projects (
	ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ProjTtl VARCHAR(100),
    Deadlines DATE,
    Budget INT,
    Requirements TEXT,
    Dep_ID INT NOT NULL,
    Progress INT,
    FOREIGN KEY (Dep_ID)
        REFERENCES Departaments (DepID)
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
	title varchar(100),
    private boolean
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