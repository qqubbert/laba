drop database if exists lab;
create database lab;
use lab;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'spiritbinge';

-- TABLES

CREATE TABLE Departaments (
    DepID INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    DepTtl VARCHAR(100),
    ProjID INT(10)
);

CREATE TABLE Users (
	ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    Login VARCHAR(100),
    Pass VARCHAR(100),
    Permission VARCHAR(100),
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

CREATE TABLE Projects (
    ProjID INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ProjTtl VARCHAR(100),
    Deadlines DATE,
    Budget INT,
    Requirements TEXT,
    Dep_ID INT(10) NOT NULL,
    Progress INT(3),
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