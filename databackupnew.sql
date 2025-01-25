-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lab
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `HtmlLink` varchar(100) DEFAULT NULL,
  `completed` tinyint(1) DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `creating_date` timestamp NULL DEFAULT (now()),
  `biology` tinyint(1) DEFAULT NULL,
  `chemistry` tinyint(1) DEFAULT NULL,
  `it` tinyint(1) DEFAULT NULL,
  `physics` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'Про искусственный интеллект','http://localhost:3002/uploads/articles/1733250267_article.html',1,5,'2024-12-03 18:25:48',0,0,1,0),(2,'Квантовые компьютеры: революция вычислительных технологий','http://localhost:3002/uploads/articles/1733250124_article.html',1,7,'2024-12-03 18:25:48',0,0,1,1),(3,'История бионических протезов','http://localhost:3002/uploads/articles/1733250443_article.html',1,26,'2024-12-03 18:27:23',1,1,0,0),(4,'Проблемы глобального потепления','http://localhost:3002/uploads/articles/1733250605_article.html',1,6,'2024-12-03 18:30:05',1,0,0,0),(5,'Статья про уборку','http://localhost:3002/uploads/articles/1733254194_article.html',1,2,'2024-12-03 19:29:54',0,1,0,0),(6,'Влияние социальных сетей','http://localhost:3002/uploads/articles/1733254338_article.html',1,1,'2024-12-03 19:32:18',1,0,0,0),(7,'Генетическое редактирование','http://localhost:3002/uploads/articles/1733254566_article.html',1,13,'2024-12-03 19:36:06',1,1,0,0),(11,'Влияние технологий на информационные системы','http://localhost:3002/uploads/articles/1733262811_article.html',1,13,'2024-12-03 21:53:31',0,0,1,0),(12,'Введите заголовок статьи','http://localhost:3002/uploads/articles/1737457648_article.html',1,13,'2025-01-21 11:07:28',0,0,0,0),(13,'Введите заголовок статьи 2','http://localhost:3002/uploads/articles/1737457678_article.html',1,13,'2025-01-21 11:07:58',0,0,0,0),(14,'Введите заголовок статьи 3','http://localhost:3002/uploads/articles/1737457713_article.html',1,13,'2025-01-21 11:08:33',0,0,0,0),(15,'Введите заголовок статьи 4','http://localhost:3002/uploads/articles/1737457729_article.html',1,13,'2025-01-21 11:08:49',0,0,0,0),(16,'test2\'s article','http://localhost:3002/uploads/articles/1737530012_article.html',1,41,'2025-01-22 07:13:32',0,0,0,1),(17,'Ремонт автомобиля ВАЗ-21099','http://localhost:3002/uploads/articles/1737565019_article.html',1,21,'2025-01-22 16:56:59',0,0,0,1),(18,'Математика: Основы','http://localhost:3002/uploads/articles/1737566861_article.html',1,30,'2025-01-22 17:27:41',0,0,0,0),(19,'Влияние искусственного интеллекта на современное общество','http://localhost:3002/uploads/articles/1737567316_article.html',1,20,'2025-01-22 17:35:16',0,0,1,0),(20,'Технологии блокчейн','http://localhost:3002/uploads/articles/1737567690_article.html',1,15,'2025-01-22 17:41:30',0,0,1,0);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_comms`
--

DROP TABLE IF EXISTS `article_comms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_comms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `comm` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `article_id` (`article_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `article_comms_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`),
  CONSTRAINT `article_comms_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_comms`
--

LOCK TABLES `article_comms` WRITE;
/*!40000 ALTER TABLE `article_comms` DISABLE KEYS */;
INSERT INTO `article_comms` VALUES (1,2,26,'Тема рассказана очень хорошо!'),(2,1,6,'Очень интересно!'),(3,2,6,'Классная тема!'),(4,5,6,'Ещё мне что-то говорил... ПОЗОРИЩЕ!!!!'),(5,1,1,'Я в шоке просто'),(6,1,1,'Надо это обдумать '),(7,2,1,'Владик как всегда написал годноту!'),(8,3,1,'Ужас'),(9,4,1,'Так вот почему снег в декабре не выпадает...'),(10,5,1,'Чел...'),(16,6,13,'Круто!'),(17,4,13,'Круто!'),(19,1,13,'Класс'),(20,16,13,'ээээмммм...'),(21,16,13,'Это что такое?'),(22,16,13,'И ты считаешь, что это научная статья? '),(23,16,13,'Ты уволен'),(24,16,2,'А мне понравилось) Класс'),(25,15,2,'ээээмммм... Это что такое? И ты считаешь, что это научная статья? '),(26,14,2,'ээээмммм... Это что такое? И ты считаешь, что это научная статья? '),(27,13,2,'ээээмммм... Это что такое? И ты считаешь, что это научная статья? '),(28,12,2,'ээээмммм... Это что такое? И ты считаешь, что это научная статья? '),(29,7,2,'ээээмммм... Это что такое? И ты считаешь, что это научная статья? '),(30,17,2,'ой ой ой, вот это работа'),(31,17,13,'Жесть, Егорик, ну ты выдал...'),(32,17,1,'Нам теперь тоже нужно такие классные статьи писать?'),(33,17,3,'У меня батя на такой гонял в 90х'),(34,17,7,'Ну ничего себе'),(35,17,19,'Полезно будет'),(36,11,24,'Ну вот это норм'),(37,17,6,'От Саратова до Москвы доеду на такой?'),(38,18,1,'Меня из-за вас отчислили(((('),(39,18,30,'Коль, ну увы'),(40,18,12,'Вы с Ерёминым знакомы?'),(41,18,2,'0 _ 0'),(42,19,19,'Гоша, ты чего выдал? '),(43,19,25,'Спасибо, я посмеялся'),(44,19,21,'Респект'),(45,20,14,'Молодец'),(46,18,14,'0 _ 0');
/*!40000 ALTER TABLE `article_comms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_msgs`
--

DROP TABLE IF EXISTS `chat_msgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_msgs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `msg` text,
  `msg_date` timestamp NULL DEFAULT (now()),
  `pinned` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `chat_msgs_chat_id_fk` (`chat_id`),
  CONSTRAINT `chat_msgs_chat_id_fk` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chat_msgs_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_msgs`
--

LOCK TABLES `chat_msgs` WRITE;
/*!40000 ALTER TABLE `chat_msgs` DISABLE KEYS */;
INSERT INTO `chat_msgs` VALUES (2,1,2,'Какие у вас новости?','2024-12-03 18:25:48',1),(3,2,3,'Как продвигается проект?','2024-12-03 18:25:48',0),(4,3,4,'Есть вопросы по молекулярной биологии.','2024-12-03 18:25:48',0),(5,4,5,'Когда следующий семинар?','2024-12-03 18:25:48',1),(6,1,6,'Я тут статью написал, оцените!','2024-12-03 18:31:26',NULL),(8,5,6,'Купил себе ласточку) Как вам?','2024-12-03 18:37:19',NULL),(9,5,13,'Круто, у меня дед на такой катался!','2024-12-03 18:38:02',NULL),(10,5,13,'Сильный мужик был','2024-12-03 18:38:11',NULL),(11,5,21,'Вот это машина, не то что моё ведро ','2024-12-03 18:39:22',NULL),(12,5,21,'(','2024-12-03 18:39:57',NULL),(13,5,19,'Вы как такой раритет откопали? ','2024-12-03 18:40:45',NULL),(14,5,6,'Да вот недалеко от мусорки нашёл с ключами внутри','2024-12-03 18:41:25',NULL),(15,1,2,'Ого','2024-12-03 18:43:09',NULL),(16,1,2,'Мне не понравилось','2024-12-03 18:43:21',NULL),(17,1,1,'Я прочитал, чел базу выдал','2024-12-03 18:44:02',NULL),(18,1,10,'Как блины приготовить?','2024-12-03 18:44:34',NULL),(19,1,10,'Скиньте рецепт','2024-12-03 18:44:47',NULL),(20,1,1,'Не благодари','2024-12-03 18:45:23',NULL),(21,1,10,'не буду','2024-12-03 18:45:38',NULL),(23,6,2,'Вы зачем меня сюда добавили?','2024-12-03 18:47:07',NULL),(24,6,2,'Ладно, если добавили, то зацените моего кота','2024-12-03 18:47:48',NULL),(25,6,26,'Ужас','2024-12-03 18:48:04',NULL),(26,6,26,'Его бы к ветеринару ','2024-12-03 18:48:15',NULL),(27,7,13,'день первый пытаюсь уволиться','2024-12-03 18:50:04',NULL),(28,7,13,'день второй пытаюсь уволиться','2024-12-03 18:50:08',NULL),(29,7,13,'день третий пытаюсь уволиться','2024-12-03 18:50:12',NULL),(30,7,13,'package connect\n\nimport (\n	\"database/sql\"\n	\"fmt\"\n	\"os\"\n\n	_ \"github.com/go-sql-driver/mysql\"\n)\n\nfunc ConToDatabase() (*sql.DB, error) {\n	root := os.Getenv(\"DB_USER\")\n	password := os.Getenv(\"DB_PASSWORD\")\n	host := os.Getenv(\"DB_HOST\")\n	port := os.Getenv(\"DB_PORT\")\n	dbName := os.Getenv(\"DB_NAME\")\n\n	dsn := fmt.Sprintf(\"%s:%s@tcp(%s:%s)/%s\", root, password, host, port, dbName)\n\n	db, err := sql.Open(\"mysql\", dsn)\n	if err != nil {\n		return nil, err\n	}\n\n	return db, nil\n}\n','2024-12-03 18:50:22',NULL),(31,7,13,'день четвёртый почти уволили','2024-12-03 18:50:57',NULL),(32,7,13,')))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))','2024-12-03 18:51:05',NULL),(34,7,13,'Вкусные','2024-12-03 18:52:57',NULL),(35,7,22,'че я тут делаю','2024-12-03 19:00:19',NULL),(36,1,1,':(','2024-12-03 19:34:14',NULL),(37,5,13,'Ну ты крутой','2024-12-03 21:08:03',NULL),(41,5,13,'Повезло очень, но посмотри на эту машину!','2024-12-03 21:30:45',NULL),(42,5,13,'Круто?','2024-12-03 21:51:41',NULL),(43,8,15,'Жду тебя на трене','2025-01-13 12:27:15',NULL),(44,8,2,'чел...','2025-01-13 12:28:00',NULL),(45,8,13,'Санёк, ты подходы сделал уже? ','2025-01-13 12:31:15',NULL),(46,7,13,'Класс','2025-01-17 07:32:17',NULL),(47,7,13,'а','2025-01-17 07:59:27',NULL),(48,7,13,'класс 2','2025-01-17 08:02:39',NULL),(49,7,13,'Мои друзья','2025-01-17 08:03:20',NULL),(51,6,13,'Саня, пора работать ','2025-01-17 08:23:47',NULL),(52,7,13,'https://chatgpt.com','2025-01-17 19:01:48',NULL),(53,7,13,'chatgpt.com','2025-01-17 19:01:56',NULL),(54,7,13,'https://chatgpt.com/ крутая темка\n','2025-01-17 19:03:01',NULL),(55,7,13,'chatgpt.com ваще бомба','2025-01-17 19:08:02',NULL),(56,7,13,'http://localhost:5173/articles/1','2025-01-17 21:08:57',NULL),(57,7,13,'http://localhost:5173/articles/1','2025-01-17 21:09:29',NULL),(58,7,13,'https://chatgpt.com/','2025-01-17 21:09:35',NULL),(59,9,26,'Кайфуем, пацаны','2025-01-18 08:33:37',NULL),(62,10,2,'Ну привет, Коленька','2025-01-20 09:40:47',NULL),(63,10,1,'Ну привет','2025-01-20 09:41:04',NULL),(64,10,1,'Меня увозят уже','2025-01-20 09:41:51',NULL),(65,10,2,'Увы','2025-01-20 09:42:06',NULL),(66,10,2,'Я уже в Бахмуте','2025-01-20 09:42:14',NULL),(67,5,21,'пацаны мотор заклинил, как расклинить?\n','2025-01-21 12:59:44',NULL),(68,15,13,'Привет','2025-01-22 15:05:21',NULL),(69,18,2,'','2025-01-22 15:07:39',NULL),(70,18,13,'Привчик','2025-01-22 15:08:17',NULL),(71,18,13,'Как делишки?','2025-01-22 15:08:24',NULL),(72,18,2,'Нормик','2025-01-22 15:09:29',NULL),(73,18,2,'У тебя как?','2025-01-22 15:09:34',NULL),(74,15,13,'Чё как? Отчислили?','2025-01-22 15:09:54',NULL),(75,19,13,'','2025-01-22 15:10:03',NULL),(76,15,1,'Давно уже','2025-01-22 15:10:25',NULL),(77,15,13,'','2025-01-22 15:11:02',NULL),(78,8,2,'А надо было?','2025-01-22 15:12:17',NULL),(79,6,2,'мне лень','2025-01-22 15:12:26',NULL),(80,8,13,'чел...','2025-01-22 15:37:11',NULL),(81,6,13,'ну ты вообще, бибизян','2025-01-22 15:48:11',NULL),(82,20,4,'','2025-01-22 15:49:10',NULL),(83,20,4,'ой, не туда...','2025-01-22 15:49:17',NULL),(84,20,13,'...','2025-01-22 15:49:46',NULL),(85,19,3,'...','2025-01-22 16:35:13',NULL),(86,19,3,'?','2025-01-22 16:35:16',NULL),(87,2,7,'я в доту играю, не мешай','2025-01-22 16:35:46',NULL),(88,9,19,'','2025-01-22 17:03:37',NULL),(89,9,25,'B-)','2025-01-22 17:03:59',NULL),(90,9,24,')))','2025-01-22 17:04:36',NULL),(91,1,13,'B)','2025-01-22 18:40:27',NULL),(92,1,13,':P','2025-01-22 18:40:41',NULL),(93,1,13,')','2025-01-22 18:41:41',NULL);
/*!40000 ALTER TABLE `chat_msgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_users`
--

DROP TABLE IF EXISTS `chat_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `chat_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`),
  KEY `chat_users_ibfk_2` (`chat_id`),
  CONSTRAINT `chat_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`),
  CONSTRAINT `chat_users_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_users`
--

LOCK TABLES `chat_users` WRITE;
/*!40000 ALTER TABLE `chat_users` DISABLE KEYS */;
INSERT INTO `chat_users` VALUES (1,1,1),(2,2,1),(3,3,2),(4,4,3),(5,5,4),(6,6,1),(7,7,2),(8,8,3),(9,9,4),(10,10,1),(11,6,5),(12,21,5),(13,13,5),(14,19,5),(15,14,5),(16,13,6),(17,2,6),(18,26,6),(19,13,1),(20,13,7),(22,15,8),(23,2,8),(24,13,8),(25,14,8),(26,26,9),(27,19,9),(28,25,9),(29,24,9),(30,2,10),(36,1,10),(37,13,15),(38,1,15),(43,13,18),(44,2,18),(45,13,19),(46,3,19),(47,13,20),(48,4,20),(49,2,21),(50,11,21),(52,7,22),(53,1,22),(54,7,23),(55,2,23),(56,7,24),(57,3,24),(58,7,25),(59,4,25),(60,7,26),(61,5,26),(62,7,27),(63,6,27),(64,7,28),(65,8,28),(66,7,29),(67,9,29),(68,7,30),(69,10,30),(70,7,31),(71,11,31),(72,7,32),(73,12,32),(74,7,33),(75,13,33),(76,7,34),(77,14,34),(78,7,35),(79,15,35);
/*!40000 ALTER TABLE `chat_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `private` tinyint(1) DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (1,'Научные исследования',0,1),(2,'Обсуждение проектов',0,3),(3,'Вопросы и ответы по биологии',0,4),(4,'Клинические испытания',0,5),(5,'Обсуждаем тачки',0,13),(6,'Проект',0,13),(7,'Заметки',0,13),(8,'Качалочка',0,13),(9,'Даньёчки правят миром',0,19),(10,'СВО',0,2),(15,NULL,1,NULL),(18,NULL,1,NULL),(19,NULL,1,NULL),(20,NULL,1,NULL),(21,NULL,1,NULL),(22,NULL,1,NULL),(23,NULL,1,NULL),(24,NULL,1,NULL),(25,NULL,1,NULL),(26,NULL,1,NULL),(27,NULL,1,NULL),(28,NULL,1,NULL),(29,NULL,1,NULL),(30,NULL,1,NULL),(31,NULL,1,NULL),(32,NULL,1,NULL),(33,NULL,1,NULL),(34,NULL,1,NULL),(35,NULL,1,NULL);
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departaments`
--

DROP TABLE IF EXISTS `departaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departaments` (
  `DepID` int NOT NULL AUTO_INCREMENT,
  `DepTtl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DepID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departaments`
--

LOCK TABLES `departaments` WRITE;
/*!40000 ALTER TABLE `departaments` DISABLE KEYS */;
INSERT INTO `departaments` VALUES (1,'Отдел биохимических исследований'),(2,'Отдел молекулярной биологии'),(3,'Отдел генетических исследований'),(4,'Отдел нанотехнологий и материаловедения'),(5,'Отдел клинических испытаний и фармакологии'),(6,'Отдел экологических исследований'),(7,'Отдел психологических и социологических исследований'),(8,'Отдел инженерии и разработки'),(9,'Отдел физики и астрономии'),(10,'Отдел информационных технологий и компьютерных наук'),(11,'Отдел пищевых технологий и агрономии'),(12,'Специальный Венерический Отдел'),(13,'Отдел не выбран');
/*!40000 ALTER TABLE `departaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fav_articles`
--

DROP TABLE IF EXISTS `fav_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fav_articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `art_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`),
  KEY `art_id` (`art_id`),
  CONSTRAINT `fav_articles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`),
  CONSTRAINT `fav_articles_ibfk_2` FOREIGN KEY (`art_id`) REFERENCES `article` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fav_articles`
--

LOCK TABLES `fav_articles` WRITE;
/*!40000 ALTER TABLE `fav_articles` DISABLE KEYS */;
INSERT INTO `fav_articles` VALUES (1,2,26),(10,4,13),(11,3,26),(15,5,26),(16,6,26),(18,4,26),(19,5,2),(20,2,2),(21,17,13),(22,19,21),(23,17,21),(24,18,21),(25,18,12),(26,20,14);
/*!40000 ALTER TABLE `fav_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msg_media`
--

DROP TABLE IF EXISTS `msg_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `msg_media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `msg_id` int DEFAULT NULL,
  `file_link` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `msg_media_msg_id_fk` (`msg_id`),
  CONSTRAINT `msg_media_msg_id_fk` FOREIGN KEY (`msg_id`) REFERENCES `chat_msgs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msg_media`
--

LOCK TABLES `msg_media` WRITE;
/*!40000 ALTER TABLE `msg_media` DISABLE KEYS */;
INSERT INTO `msg_media` VALUES (1,6,'http://localhost:3002/uploads/1733250677_Alisov\'s_classification_of_climate_ru.jpg'),(2,8,'http://localhost:3002/uploads/1733251029_230108092534.jpg'),(3,12,'http://localhost:3002/uploads/1733251193_photo_2024-12-03_21-39-42.jpg'),(4,20,'http://localhost:3002/uploads/1733251517_3c85b6cd2c1251c7b7520377abb51aea.jpg'),(5,24,'http://localhost:3002/uploads/1733251647_b7b9dfcdd5bff5a9cb5f9c25b73c1227.jpg'),(7,34,'http://localhost:3002/uploads/1733251971_3c85b6cd2c1251c7b7520377abb51aea.jpg'),(10,42,'http://localhost:3002/uploads/1733262700_b4d100a7a9af943a893e422d1e59a3b4.jpg'),(11,44,'http://localhost:3002/uploads/1736771275_1151b51cd51861cb5ce730a13653b89c.jpg'),(12,46,'http://localhost:3002/uploads/1737099123_6e9fdaf9cfd08bc08ef6404836d1775b.jpg'),(13,46,'http://localhost:3002/uploads/1737099128_b27f31e8ddc96d54536e1f162948272a.jpg'),(14,48,'http://localhost:3002/uploads/1737100940_e9d19568b9d52d36449c22277a2eca5a.jpg'),(15,48,'http://localhost:3002/uploads/1737100944_f65f1fe4589830a8fa4f243f469f899e.jpg'),(16,48,'http://localhost:3002/uploads/1737100950_dfe84a9097c51e3ac00b9ae340cb9309.jpg'),(17,49,'http://localhost:3002/uploads/1737100969_photo_2024-10-28_16-41-35.jpg'),(18,49,'http://localhost:3002/uploads/1737100976_artworks-000658878094-4e3trz-t500x500.jpg'),(19,49,'http://localhost:3002/uploads/1737100980_455f0ebb609724aa8dedb3b6a78c9267.jpg'),(20,49,'http://localhost:3002/uploads/1737100985_lizard.png'),(21,49,'http://localhost:3002/uploads/1737100992_qb46rtma087c1.webp'),(24,64,'http://localhost:3002/uploads/1737366103_230108092534.jpg'),(25,69,'http://localhost:3002/uploads/1737558458_0f3a30c9f02aeadf6474a2babcb98397.jpg'),(26,75,'http://localhost:3002/uploads/1737558602_f65f1fe4589830a8fa4f243f469f899e.jpg'),(27,77,'http://localhost:3002/uploads/1737558661_static-img.aripaev.jpg'),(28,82,'http://localhost:3002/uploads/1737560924_105de5d305ed6ee5d397a1b973615889.jpg'),(29,82,'http://localhost:3002/uploads/1737560932_photo_2024-11-27_20-54-31.jpg'),(30,82,'http://localhost:3002/uploads/1737560939_0f3a30c9f02aeadf6474a2babcb98397.jpg'),(31,82,'http://localhost:3002/uploads/1737560944_photo_2024-12-03_22-04-23.jpg'),(32,82,'http://localhost:3002/uploads/1737560949_wUBZnx8raP0.jpg'),(33,88,'http://localhost:3002/uploads/1737565416_e9d19568b9d52d36449c22277a2eca5a.jpg');
/*!40000 ALTER TABLE `msg_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registerkeys`
--

DROP TABLE IF EXISTS `registerkeys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registerkeys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `regKey` varchar(255) DEFAULT NULL,
  `keyCreatorID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `keyCreatorID` (`keyCreatorID`),
  CONSTRAINT `registerkeys_ibfk_1` FOREIGN KEY (`keyCreatorID`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registerkeys`
--

LOCK TABLES `registerkeys` WRITE;
/*!40000 ALTER TABLE `registerkeys` DISABLE KEYS */;
INSERT INTO `registerkeys` VALUES (9,'6alVo2PJlHqyaBvV',NULL),(10,'Tnz15P6IjxE3DA6o',NULL),(12,'KmRXjKwLSTO2o6ev',NULL),(13,'P7p9sQvdImswIQJs',NULL),(14,'caotbwqktyuP8sBi',NULL),(15,'weCh7JOEe2rAu6hp',NULL),(16,'LC2iMqDJqakTONPd',NULL),(17,'McvnosjGoZj7foeK',NULL),(18,'cAJNe0yQMpA5Zqrs',NULL),(19,'Bc5jRFRqu2UzhppX',NULL),(20,'KQWfFTWEQhzJ2IcS',NULL),(21,'e0SZPUe4TqtJBr9v',NULL),(22,'1kOQTmav5W8T5ZeO',NULL),(23,'IKPcEKsoDCAIYcS0',NULL),(24,'UWa4fXLaozORnSlq',NULL),(25,'L2HKVXeddr2zby3x',NULL),(26,'nOLzihSiPzNGCQAR',NULL),(27,'F9Rn4Vx9yIi7hN9t',NULL),(28,'Io3QZXHdBlFn80PW',NULL),(29,'NpNTTFJyL8xbISsl',NULL),(30,'GFUcElU4tU5wIkTh',NULL);
/*!40000 ALTER TABLE `registerkeys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Id_Employee` int DEFAULT NULL,
  `Task` text,
  `Progress` int DEFAULT NULL,
  `Completed` tinyint DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Id_Employee` (`Id_Employee`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`Id_Employee`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,1,'Изучить методы анализа белков',50,0),(2,2,'Подготовить материалы для уборки',100,1),(3,3,'Провести эксперименты по молекулярной биологии',30,0),(4,4,'Подготовить отчет по проекту',70,0),(5,5,'Собрать данные для исследования',60,0),(6,6,'Разработать план клинических испытаний',20,0),(7,7,'Составить список необходимых материалов',40,0),(8,8,'Анализировать результаты экологических исследований',80,0),(9,9,'Исследовать наноматериалы',90,0),(10,10,'Провести анализ физических свойств',10,0),(11,1,'Собрать образцы слюны собак',52,0),(12,1,'Написать статью о влиянии витамина B3 на организм человека',12,0),(13,2,'Убрать кабинеты 501, 52, 42',100,1),(14,13,'Излечить весь мир (Санька) от рака',5,0),(15,6,'Нефть качать',99,0),(16,5,'Помыть туалет',0,0),(17,26,'Попить чай',100,1),(18,26,'Посмотреть тикток',90,0),(19,26,'Наорать на Санька',33,0),(20,25,'Убрать разбитый стакан',0,0),(21,25,'Уволиться',0,0),(22,22,'Повысить квалификацию',0,0),(23,22,'Сдать итоговое сочинение',0,0),(24,30,'Приготовить блины',0,0),(25,30,'Приготовить чай директору',0,0),(26,30,'Провести лекцию о салатах',0,0),(27,10,'Научиться готовить блины',0,0),(28,9,'Найти подопытного для исследований',0,0),(29,9,'Изучить гены Букина',100,1),(30,8,'Кинуть бомбер Саньку',0,0),(31,7,'Поесть конфетки',0,0),(32,12,'Помочь Игорю в исследованиях',91,0),(33,21,'Собрать машину',67,0),(34,21,'Завести машину',100,1),(35,21,'Проехать 1 метр на машине',0,0),(36,4,'Сбежать с завода',0,0),(37,11,'Перевести лекцию о лекарствах на китайский',0,0),(38,2,'Помыть пол на 3м этаже',100,1),(39,3,'Написать отчёт',0,0),(40,1,'Написать отчёт',1,0),(42,1,'Отнести препараты к кабинету 202',22,0),(43,15,'Сделать',0,0),(44,2,'Убрать мусор в кабинетах',52,0),(45,2,'Купить швабру',0,0),(46,2,'Купить ведро',50,0),(47,2,'Купить мыло',0,0),(48,2,'Купить губку',3,0);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Login` varchar(100) DEFAULT NULL,
  `Pass` varchar(100) DEFAULT NULL,
  `Permission` varchar(100) DEFAULT NULL,
  `FirstName` varchar(30) DEFAULT (_utf8mb4'Имя'),
  `LastName` varchar(30) DEFAULT (_utf8mb4'Фамилия'),
  `Surname` varchar(30) DEFAULT (_utf8mb4'Отчество'),
  `Gender` char(1) DEFAULT NULL,
  `Birthday` date DEFAULT NULL,
  `FamilyStatus` varchar(50) DEFAULT (_utf8mb4'Семейный статус'),
  `HavingChildren` int DEFAULT (0),
  `JobTitle` varchar(30) DEFAULT 'Должность не выбрана',
  `AcademicDegree` varchar(50) DEFAULT (_utf8mb4'Учёная степень'),
  `DepID` int DEFAULT NULL,
  `WorkExperience` int DEFAULT (0),
  `Salary` int DEFAULT (0),
  `PhoneNumber` varchar(11) DEFAULT (_utf8mb4'88005553535'),
  `Email` varchar(50) DEFAULT (_utf8mb4'example@mail.com'),
  `Isblocked` tinyint(1) DEFAULT (false),
  `ProfilePicLink` varchar(100) DEFAULT (_utf8mb4''),
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `DepID` (`DepID`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`DepID`) REFERENCES `departaments` (`DepID`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nikolai','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Николай','Шебалков','Романович','М','2005-08-25','Холост',1,'Лаборант','Кандидат наук',2,10,100001,'1234567890','lolkek.doe@example.com',0,'http://localhost:3002/uploads/1733252237_photo_2024-09-29_19-37-46.jpg'),(2,'alexander','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Александр','Наумов','Павлович','М','2006-08-29','В активном поиске',1,'Уборщик','Образование отсутствует',2,13,19242,'14881337','kekcheberek.doe@example.com',0,'http://localhost:3002/uploads/1733252221_oLl70C_krAg.jpg'),(3,'sergei','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Сергей','Степцов','Сергеевич','М','2006-06-18','Холост',0,'Лаборант','Бакалавр',1,3,44000,'5556667777','michael.smith@example.com',0,'http://localhost:3002/uploads/1733252734_photo_2024-07-27_22-51-32.jpg'),(4,'vasiliy','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Василий','Блохин','Витальевич','М','1985-05-17','Разведён',6,'Профессор','Доктор наук',2,10,150000,'4443332222','emily.jones@example.com',0,''),(5,'matvey','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Матвей','Самойличенко','Павлович','М','2003-08-12','Разведён',0,'Уборщик','Среднее профессиональное орбазование',2,8,70000,'3335555444','garrys.mod@ksuf.com',0,'http://localhost:3002/uploads/1733252690_photo_2024-12-03_22-04-23.jpg'),(6,'dmitry','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Дмитрий','Шабанов','Павлович','М','2004-08-15','Холост',8,'Инженер','Среднее профессиональное орбазование',2,4,190000,'8005553535','burila.skvazhin@skuf.com',0,'http://localhost:3002/uploads/1733252296_photo_2024-12-03_21-57-40.jpg'),(7,'vladislav','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Владислав','Морозов','Витальевич','М','2008-02-17','Холост',0,'Лаборант','Основное общее образование',3,2,30000,'7777777777','skufazavr777@skuf.ru',0,''),(8,'miron','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Мирон','Воронин','Максимович','М','2009-12-18','Холост',0,'Электрик','Основное общее образование',3,0,10000,'3046708436','sgbdboujndfh@skuf.com',0,'http://localhost:3002/uploads/1733252275_photo_2024-07-11_09-44-07.jpg'),(9,'vyacheslav','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Вячеслав','Иванов','Романович','М','1999-10-13','Женат',3,'Профессор','Образование отсутствует',3,6,25000,'5774557458','bsdjbjbd@skuf.com',0,''),(10,'kristina','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Кристина','Ивичук','Витальевна','Ж','2007-01-12','Вдова',0,'Химик','Аспирант',4,1,15000,'4373657868','nsd57kjnljxn@skuf.com',0,''),(11,'vladislav2','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Владислав','Воробьёв','Александрович','М','2006-12-24','Женат',2,'Администратор','Бакалавр',5,2,65000,'5377677658','sgfjmghmmcyh@skuf.com',0,''),(12,'artyom','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Артём','Шум','Витальевич','М','2006-08-14','Женат',2,'Физик','Бакалавр',5,3,55000,'4764536864','sdhgdkhv@skuf.com',0,'http://localhost:3002/uploads/1733252506_LxjSffjkOuI.jpg'),(13,'igor','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','admin','Игорь','Веденеев','Андреевич','М','2006-10-14','Холост',0,'Физик','Аспирант',5,4,17500000,'666-777','minecraftik@skuf.com',0,'http://localhost:3002/uploads/1733252832_photo_2024-12-03_22-06-56.jpg'),(14,'aleksey','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Алексей','Пасечников','Павлович','М','2003-05-04','Холост',0,'Химик','Аспирант',6,2,75000,'47697898870','xgfjnncx@gmail.com',0,''),(15,'dmitry2','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Дмитрий','Лукьянов','Владимирович','М','2007-05-13','Холост',0,'Лаборант','Аспирант',6,1,65000,'58757484679','vvvvvsdvfds@mail.ru',0,'http://localhost:3002/uploads/1733252948_photo_2024-10-28_16-41-35.jpg'),(16,'kirill','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Кирилл','Назаров','Иванович','М','2007-01-09','Женат',0,'Лаборант','Аспирант',6,0,55000,'54765876989','dsgsdgs@mail.com',0,'http://localhost:3002/uploads/1733252647_9Fdj5pbfw2s.jpg'),(17,'nurdil','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Нурадиль','Хаджанов','Азаматович','М','2006-04-18','Холост',0,'Уборщик','Среднее профессиональное орбазование',6,3,15000,'55547645754','fghjklmjhgdfsdas@mail.com',0,'http://localhost:3002/uploads/1733252788_photo_2023-10-30_18-56-59.jpg'),(18,'svyatoslav','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Святослав','Несинов','Сергеевич','М','1998-07-13','Холост',0,'Физик','Среднее профессиональное орбазование',7,0,15000,'12345678965','qwerty@mail.com',0,''),(19,'daniil','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Даниил','Витков','Владимирович','М','1995-02-28','Женат',0,'Профессор','Среднее профессиональное орбазование',9,0,30000,'14327654776','q1w2e3r4t5y6@mail.ru',0,''),(20,'georgiy','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Георгий','Крючихин','Артемович','М','1984-12-02','Холост',0,'Математик','Среднее профессиональное орбазование',7,13,29000,'43654765867','sdgfxdhjfm@mail.com',0,'http://localhost:3002/uploads/1733252663_wUBZnx8raP0.jpg'),(21,'egor','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Егор','Лукьянов','Андреевич','М','1990-01-17','Женат',3,'Математик','Среднее профессиональное образование',8,9,19242,'32545756868','dgjf@ljhl.ru',0,'http://localhost:3002/uploads/1733252564_photo_2024-12-03_21-39-42.jpg'),(22,'dim4ik','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Дмитрий','Корабельников','Сергеевич','М','1962-05-29','Женат',5,'Математик','Среднее профессиональное орбазование',8,19,190242,'2352352353','dimaaa@ljhl.ru',0,''),(23,'armyan','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Артур','Петросян','Давидович','М','1990-11-02','Холост',0,'Физик','Аспирант',8,6,89567,'1234567890','armenia@ljhl.ru',0,''),(24,'kazahDanya','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Даниель','Ни','Андреевич','М','2006-03-04','Холост',0,'Лаборант','Аспирант',9,1,63656,'7777343234','dcb@ljhl.ru',0,''),(25,'glist29','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Даниил','Сатюков','Олегович','М','2005-04-29','Женат',0,'Уборщик','Начальное общее образование',9,1,3000,'6666777777','glista@ljhl.ru',0,''),(26,'qra','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','admin','Данила','Демидов','Александрович','М','1990-12-17','Холост',0,'Директор','Среднее профессиональное орбазование',9,24,300000000,'999999999','qra@ljhl.ru',0,'http://localhost:3002/uploads/1733252320_photo_2024-11-11_00-40-41.jpg'),(27,'vasya','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Василиса','Бочнюк','Андреевна','Ж','2006-09-04','Не замужем',0,'Старший научный сотрудник','Среднее профессиональное орбазование',10,1,63050,'8888777777','vasya@ljhl.ru',0,''),(28,'nastya','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Анастасия','Егорова','Игоревна','Ж','2000-06-03','Замужем',0,'Лаборант','Среднее профессиональное орбазование',10,2,30000,'1111777777','nastya@ljhl.ru',0,''),(29,'dasha','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Дарья','Назаренко','Тарасовна','Ж','2000-03-06','Не замужем',0,'Лаборант','Среднее профессиональное орбазование',10,1,40000,'2222777777','dahs@ljhl.ru',0,''),(30,'aboba','$2b$10$0MYFAuj1UsW19nk.u9AlfOAIidlQeGFgrJNW9UV6o1Pf.tsvAWAjm','user','Абдуджафис','Бободжанов','Абдурасулович','М','1945-05-09','Женат',6,'Профессор','Доктор наук',11,50,100000,'6666111111','abebra@ljhl.ru',0,'http://localhost:3002/uploads/1733253318_Bobodjanov2-1.jpg'),(40,'test','$2b$10$LB/5..QUEuyCFQeD2NHuaOr5aPjSf590oLrESW89vVCVDXqHwhpm2','user','test','test','test','М','2000-12-12','Холост',0,'Должность не выбрана','test',13,2,0,'88005553535','test@gmail.com',1,''),(41,'test2','$2b$10$WKdhS7h8LzdeqW60rIiGQ.gSym2vwlmCpHn1DcgfOw/SZJPqjOXN6','user','test2','test2','test2','М','2000-12-12','Холост',0,'Должность не выбрана','test2',13,2,0,'534534','test2@mail.com',1,''),(42,'test2sg','$2b$10$xWfeW8.3r08QuZE0S5FKt.1LGOkJeIzlJc79tkW5jHazTSAfdcM6G','user','test2','test2','test2','М','1222-12-12','Холост',0,'Должность не выбрана','test2',13,2,0,'test2','test2',1,''),(43,'test3','$2b$10$Jn.GfPPyrnxYpL6pyVtja./GLIzcys5iuAiDT7H6j/l9kaNK884ii','user','test3','test3','test3','М','2003-03-13','Холост',0,'Должность не выбрана','test3',13,3,0,'test3','test3',1,'');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-22 22:41:39
