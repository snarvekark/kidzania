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
-- Table structure for table `PictureAssignment`
--

DROP TABLE IF EXISTS `PictureAssignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PictureAssignment` (
  `username` varchar(50) NOT NULL,
  `classnumber` int(11) NOT NULL,
  `picturename` varchar(45) DEFAULT NULL,
  `cloudfrontPictureFile` varchar(50) NOT NULL,
  `object1` varchar(50) DEFAULT NULL,
  `object2` varchar(50) DEFAULT NULL,
  `object3` varchar(50) DEFAULT NULL,
  `object4` varchar(50) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  KEY `username_PictureAssignment_FK` (`username`),
  CONSTRAINT `username_PictureAssignment_FK` FOREIGN KEY (`username`) REFERENCES `UserInfo` (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PictureAssignment`
--

LOCK TABLES `PictureAssignment` WRITE;
/*!40000 ALTER TABLE `PictureAssignment` DISABLE KEYS */;
INSERT INTO `PictureAssignment` VALUES ('mike',1,'pandapicture','','panda_T','animal_T','tree_F','food_F','2019-10-02 00:00:00'),('mike',1,'seapicture','','land_T','terrain_T','water_F','sea_F','2019-01-01 00:00:00'),('mike',1,'gardenpicture','','garden_T','flower_T','water_F','food_F','2019-10-10 00:00:00'),('mike',0,'landscape picture','','land_T','terrain_T','water_F','sea_F',NULL),('mike',1,'landscape picture','','land_T','terrain_T','water_F','sea_F',NULL),('mike',1,'landscape picture','','land_T','terrain_T','water_F','sea_F',NULL),('mike',1,'landscape picture','','land_T','terrain_T','water_F','sea_F','2019-02-09 00:00:00'),('mike',1,'birdpicture','','crow_T','sparrow_T','animal_F','mammal_F','2018-02-09 00:00:00'),('mike',1,'birdpicture','','crow_T','sparrow_T','animal_F','mammal_F','2018-02-09 00:00:00'),('geethu',1,'peacockpicture','','crow_T','sparrow_T','animal_F','mammal_F','2018-02-09 00:00:00');
/*!40000 ALTER TABLE `PictureAssignment` ENABLE KEYS */;
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

-- Dump completed on 2019-12-08  8:55:38
