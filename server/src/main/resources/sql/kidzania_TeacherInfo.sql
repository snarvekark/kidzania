-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: kidzania-database.crzp4v3oglnf.us-west-1.rds.amazonaws.com    Database: kidzania
-- ------------------------------------------------------
-- Server version	8.0.16

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `TeacherInfo`
--

DROP TABLE IF EXISTS `TeacherInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TeacherInfo` (
  `UserName` varchar(100) NOT NULL,
  `StoryTitle` varchar(100) DEFAULT NULL,
  `StoryTextFile` varchar(100) DEFAULT NULL,
  `cloudFrontTextFile` varchar(100) DEFAULT NULL,
  `StoryPicture` varchar(100) DEFAULT NULL,
  `Storymp3` varchar(100) DEFAULT NULL,
  `CloudFrontmp3` varchar(100) DEFAULT NULL,
  `Classnumber` varchar(20) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  KEY `UserName_FK` (`UserName`),
  CONSTRAINT `UserName_FK` FOREIGN KEY (`UserName`) REFERENCES `UserInfo` (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TeacherInfo`
--

LOCK TABLES `TeacherInfo` WRITE;
/*!40000 ALTER TABLE `TeacherInfo` DISABLE KEYS */;
INSERT INTO `TeacherInfo` VALUES ('bradpitt','storytitle','teststorytext','testcloudfronttext','storypicture','storymp3','cloudfrontmp3','3','2019-02-09 00:00:00'),('bradpitt','three little pigs','teststorytext','testcloudfronttext','storypicture','storymp3','cloudfrontmp3','1','2019-03-03 00:00:00'),('bradpitt','One little spider','storytextfile','cloudFrontTextFile','storyPicture','storyMp3','cloudFrontmp3',NULL,'2019-02-09 00:00:00'),('bradpitt','The Wonder Women','storytextfile','cloudFrontTextFile','storyPicture','storyMp3','cloudFrontmp3',NULL,'2018-02-09 00:00:00'),('bradpitt','The Three musketeers','storytextfile','cloudFrontTextFile','storyPicture','storyMp3','cloudFrontmp3',NULL,'2017-02-09 00:00:00'),('bradpitt','Home Alone','storytextfile','cloudFrontTextFile','storyPicture','storyMp3','cloudFrontmp3','100','2017-02-09 00:00:00'),('bradpitt','The Velveteen Rabbit','storytextfile','cloudFrontTextFile','storyPicture','storyMp3','cloudFrontmp3','1','2018-02-09 00:00:00'),('geethu','Romeo and Juliet','Romeo and Juliet.txt','','Romeo and Juliet.jpeg','Romeo and Juliet.mp3','','2','2019-11-27 00:00:00'),('geethu','This is my first story upload','This is my first story upload.txt','http://d22zgkgj3mwq8f.cloudfront.net/geethu/This is my first story upload.txt','This is my first story upload.jpeg','This is my first story upload.mp3','http://d22zgkgj3mwq8f.cloudfront.net/geethu/This is my first story upload.mp3','1','2019-11-27 00:00:00'),('geethu','Gymnastics','Gymnastics.txt','http://d22zgkgj3mwq8f.cloudfront.net/geethu/Gymnastics.txt','Gymnastics.jpeg','Gymnastics.mp3','http://d22zgkgj3mwq8f.cloudfront.net/geethu/Gymnastics.mp3','1','2019-11-28 00:00:00'),('geethu','Raining Days','Raining Days.txt','http://d22zgkgj3mwq8f.cloudfront.net/geethu/Raining Days.txt','Raining Days.jpeg','Raining Days.mp3','http://d22zgkgj3mwq8f.cloudfront.net/geethu/Raining Days.mp3','100','2019-12-01 00:00:00'),('geethu','test','test.txt','http://d22zgkgj3mwq8f.cloudfront.net/geethu/test.txt','test.jpeg','test.mp3','http://d22zgkgj3mwq8f.cloudfront.net/geethu/test.mp3',NULL,'2019-12-02 00:00:00'),('User1','Starts','Starts.txt','http://d22zgkgj3mwq8f.cloudfront.net/User1/Starts.txt','Starts.jpeg','Starts.mp3','http://d22zgkgj3mwq8f.cloudfront.net/User1/Starts.mp3','3','2019-12-07 00:00:00'),('User1','Planet','Planet.txt','http://d22zgkgj3mwq8f.cloudfront.net/User1/Planet.txt','Planet.jpeg','Planet.mp3','http://d22zgkgj3mwq8f.cloudfront.net/User1/Planet.mp3',NULL,'2019-12-07 00:00:00'),('User1','The lion king','The lion king.txt','http://d22zgkgj3mwq8f.cloudfront.net/User1/The lion king.txt','The lion king.jpeg','The lion king.mp3','http://d22zgkgj3mwq8f.cloudfront.net/User1/The lion king.mp3',NULL,'2019-12-07 00:00:00');
/*!40000 ALTER TABLE `TeacherInfo` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-08  8:55:36
