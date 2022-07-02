CREATE DATABASE  IF NOT EXISTS `bairways` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bairways`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bairways
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `aircraft`
--

DROP TABLE IF EXISTS `aircraft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aircraft` (
  `aircraftID` int NOT NULL AUTO_INCREMENT,
  `aircraftTypeID` int DEFAULT NULL,
  `EconomySeatCount` int DEFAULT NULL,
  `BusinessSeatCount` int DEFAULT NULL,
  `PlanitnumSeatCount` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`aircraftID`),
  KEY `aircraftTypeID` (`aircraftTypeID`),
  CONSTRAINT `aircraft_ibfk_1` FOREIGN KEY (`aircraftTypeID`) REFERENCES `aircrafttype` (`aircraftTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircraft`
--

LOCK TABLES `aircraft` WRITE;
/*!40000 ALTER TABLE `aircraft` DISABLE KEYS */;
INSERT INTO `aircraft` VALUES (1,1,50,50,50,1),(2,2,70,50,50,1),(3,2,45,50,70,1),(4,1,80,100,40,1),(5,3,100,200,15,1),(6,2,90,150,70,1),(7,1,100,150,40,1),(8,2,80,100,30,1),(9,1,85,90,80,1),(10,2,70,100,70,1),(11,3,80,150,150,1),(12,3,90,100,120,1),(13,1,100,100,90,1);
/*!40000 ALTER TABLE `aircraft` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aircraft_after_update` AFTER UPDATE ON `aircraft` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update flight set status=0 where flight.aircraftID=aircraftID;
    END IF;
    IF new.status=0 THEN
        Update aircraftseat set status=0 where aircraftseat.airCraftID=aircraftID;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `aircraftseat`
--

DROP TABLE IF EXISTS `aircraftseat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aircraftseat` (
  `airCraftseatID` int NOT NULL AUTO_INCREMENT,
  `airCraftID` int DEFAULT NULL,
  `classID` int DEFAULT NULL,
  `xCord` int DEFAULT NULL,
  `yCord` int DEFAULT NULL,
  `seatNumber` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`airCraftseatID`),
  KEY `classID` (`classID`),
  KEY `aircraftseat_ibfk_1` (`airCraftID`),
  CONSTRAINT `aircraftseat_ibfk_1` FOREIGN KEY (`airCraftID`) REFERENCES `aircraft` (`aircraftID`),
  CONSTRAINT `aircraftseat_ibfk_2` FOREIGN KEY (`classID`) REFERENCES `class` (`classID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircraftseat`
--

LOCK TABLES `aircraftseat` WRITE;
/*!40000 ALTER TABLE `aircraftseat` DISABLE KEYS */;
INSERT INTO `aircraftseat` VALUES (1,1,1,1,2,15,1),(2,1,1,1,3,16,1),(3,1,1,2,4,18,1),(4,1,2,2,3,17,1),(5,1,2,2,5,42,1),(6,1,2,5,7,19,1),(7,2,1,4,6,20,1),(8,2,1,4,5,21,1),(9,2,1,2,8,28,1),(10,2,1,4,5,16,1),(11,2,2,4,7,17,1),(12,3,2,3,8,70,1),(13,3,2,3,9,34,1),(14,3,3,4,6,63,1),(15,4,2,3,3,14,1);
/*!40000 ALTER TABLE `aircraftseat` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aircraftseat_after_update` AFTER UPDATE ON `aircraftseat` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update booking set status=0 where booking.airCraftseatID=airCraftseatID;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `aircrafttype`
--

DROP TABLE IF EXISTS `aircrafttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aircrafttype` (
  `aircraftTypeID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`aircraftTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircrafttype`
--

LOCK TABLES `aircrafttype` WRITE;
/*!40000 ALTER TABLE `aircrafttype` DISABLE KEYS */;
INSERT INTO `aircrafttype` VALUES (1,'Boeing 737','High metal material aircraft, short-to medium-range twinjet narrow-body airliner.Originally developed as a shorter,lower cost twin engined airliner derived from Boeing\'s 707 and 727,the 737 has developed into a family of nine passenger models with a capacity of 85 to 215 passengers ',1,NULL),(2,'Boeing 757','The Boeing 757 is an American narrow-body airliner designed and built by Boeing Commercial Airplanes ,High metal material aircraft',1,NULL),(3,'Airbus A380','Large wide-body airliner that was developed and produced by Airbus.It is the world\'s largest passenger airliner.Low metal material aircraft',1,NULL);
/*!40000 ALTER TABLE `aircrafttype` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aircrafttype_after_update` AFTER UPDATE ON `aircrafttype` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update aircraft set status=0 where aircraft.aircraftTypeID=aircraftTypeID;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `airport`
--

DROP TABLE IF EXISTS `airport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airport` (
  `airport_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`airport_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airport`
--

LOCK TABLES `airport` WRITE;
/*!40000 ALTER TABLE `airport` DISABLE KEYS */;
INSERT INTO `airport` VALUES (1,'CGK',1),(2,'DPS',1),(3,'BIA',1),(4,'HRI',1),(5,'DEL',1),(6,'BOM',1),(7,'MAA',1),(8,'BKK',1),(9,'DMK',1),(10,'SIN',1);
/*!40000 ALTER TABLE `airport` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `airport_after_update` AFTER UPDATE ON `airport` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update airportleveldetail set status=0 where airportleveldetail.airport_id=airport_id;
    END IF;
    IF new.status=0 THEN
        Update route set status=0 where route.OriginID=airport_id or route.DestinationID=airport_id;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `airportleveldetail`
--

DROP TABLE IF EXISTS `airportleveldetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airportleveldetail` (
  `airportlevelDetailID` int NOT NULL AUTO_INCREMENT,
  `airport_id` int DEFAULT NULL,
  `levelID` int DEFAULT NULL,
  `value` varchar(20) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`airportlevelDetailID`),
  KEY `levelID` (`levelID`),
  KEY `airport_id` (`airport_id`),
  CONSTRAINT `airportleveldetail_ibfk_1` FOREIGN KEY (`levelID`) REFERENCES `level` (`levelID`),
  CONSTRAINT `airportleveldetail_ibfk_2` FOREIGN KEY (`airport_id`) REFERENCES `airport` (`airport_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airportleveldetail`
--

LOCK TABLES `airportleveldetail` WRITE;
/*!40000 ALTER TABLE `airportleveldetail` DISABLE KEYS */;
INSERT INTO `airportleveldetail` VALUES (1,1,1,'Tangerang',1),(3,1,3,'Banten',1),(4,1,4,'Indonesia',1),(5,1,5,'Asia',1),(6,2,1,'Tuban',1),(7,2,2,'Badung',1),(8,2,3,'Bali',1),(9,2,4,'Indonesia',1),(10,2,5,'Asia',1),(11,3,1,'Katunayaka',1),(12,3,2,'Gampaha',1),(13,3,3,'Western',1),(14,3,4,'Sri Lanka',1),(15,3,5,'Asia',1),(16,4,1,'Mattala',1),(17,4,2,'Hambanthota',1),(18,4,3,'Southern',1),(19,4,4,'Sri Lanka',1),(20,4,5,'Asia',1),(21,5,1,'Delhi',1),(24,5,4,'India',1),(25,5,5,'Asia',1),(26,5,6,'Palam',1),(27,6,6,'Maharashtra',1),(28,6,1,'Mumbai',1),(29,6,4,'India',1),(30,6,5,'Asia',1),(31,7,6,'Tamil Nadu',1),(32,7,1,'Chennai',1),(33,7,4,'India',1),(34,7,5,'Asia',1),(35,8,7,'Racha Thewa',1),(36,8,2,'Bang phli',1),(37,8,3,'Samut Parakan',1),(38,8,4,'Thailand',1),(39,8,5,'Asia',1),(40,9,1,'City',1),(41,9,4,'Thailand',1),(42,9,5,'Asia',1),(43,9,2,'Don Mueang',1),(45,10,8,'East',1),(46,10,4,'Singapore',1),(47,10,5,'Asia',1);
/*!40000 ALTER TABLE `airportleveldetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authorizeduser`
--

DROP TABLE IF EXISTS `authorizeduser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authorizeduser` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `image` blob,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorizeduser`
--

LOCK TABLES `authorizeduser` WRITE;
/*!40000 ALTER TABLE `authorizeduser` DISABLE KEYS */;
INSERT INTO `authorizeduser` VALUES (1,'Hasitha','Jayaweeera','manager@gmail.com',NULL,'$2b$09$rkPG1PU.dZB.ejAF4kxEAucNoUAW1M6DN1QDLnd3Dh7x0i0jBP4bu',1,1,NULL),(2,'Hasitha','Jayaweeera','admin@gmail.com',NULL,'$2b$09$DOOm5MxJp.45pDjlEvmyGe90uhQElvYQ0Oh0aGSkCrUvTYaIgW.sq',1,2,NULL);
/*!40000 ALTER TABLE `authorizeduser` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `authorizeduser_after_update` AFTER UPDATE ON `authorizeduser` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update userphone set status=0 where userphone.authUserID=userID;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `bookingID` int NOT NULL,
  `registeredUserID` int DEFAULT NULL,
  `guestUserID` int DEFAULT NULL,
  `flightID` int DEFAULT NULL,
  `paymentStatus` tinyint DEFAULT NULL,
  `bookingTimeDate` datetime DEFAULT NULL,
  `classID` int DEFAULT NULL,
  `airCraftseatID` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `discountID` int DEFAULT NULL,
  `under18` tinyint DEFAULT NULL,
  PRIMARY KEY (`bookingID`),
  UNIQUE KEY `uniqueconstraintbooking` (((case when (`status` = _utf8mb4'1') then `flightID` end)),((case when (`status` = _utf8mb4'1') then `airCraftseatID` end))),
  KEY `discountID` (`discountID`),
  KEY `airCraftseatID` (`airCraftseatID`),
  KEY `classID` (`classID`),
  KEY `flightID` (`flightID`),
  KEY `registeredUserID` (`registeredUserID`),
  KEY `guestUserID` (`guestUserID`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`discountID`) REFERENCES `discount` (`discountID`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`airCraftseatID`) REFERENCES `aircraftseat` (`airCraftseatID`),
  CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`classID`) REFERENCES `class` (`classID`),
  CONSTRAINT `booking_ibfk_4` FOREIGN KEY (`flightID`) REFERENCES `flight` (`flightID`),
  CONSTRAINT `booking_ibfk_5` FOREIGN KEY (`registeredUserID`) REFERENCES `registeredcustomer` (`userID`),
  CONSTRAINT `booking_ibfk_6` FOREIGN KEY (`guestUserID`) REFERENCES `guest` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,1,NULL,1,0,'2022-08-16 07:14:47',1,2,1,1,1),(2,NULL,1,2,0,'2022-03-16 07:14:47',2,3,1,NULL,1),(3,1,NULL,2,0,'2022-05-16 07:14:47',1,1,1,2,0),(4,1,NULL,3,0,'2022-06-16 07:14:47',3,3,1,1,0),(5,NULL,2,4,0,'2022-07-16 07:14:47',1,4,1,NULL,1);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `classID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`classID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'Platinum',1),(2,'Business',1),(3,'Economy',1);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `class_after_update` AFTER UPDATE ON `class` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update classprice set status=0 where classprice.classID=classID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `classprice`
--

DROP TABLE IF EXISTS `classprice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classprice` (
  `classPriceID` int NOT NULL,
  `RouteID` int DEFAULT NULL,
  `classID` int DEFAULT NULL,
  `Price` decimal(8,2) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `startTimeDate` datetime DEFAULT NULL,
  `endTimeDate` datetime DEFAULT NULL,
  PRIMARY KEY (`classPriceID`),
  KEY `RouteID` (`RouteID`),
  KEY `classID` (`classID`),
  CONSTRAINT `classprice_ibfk_1` FOREIGN KEY (`RouteID`) REFERENCES `route` (`RouteID`),
  CONSTRAINT `classprice_ibfk_2` FOREIGN KEY (`classID`) REFERENCES `class` (`classID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classprice`
--

LOCK TABLES `classprice` WRITE;
/*!40000 ALTER TABLE `classprice` DISABLE KEYS */;
INSERT INTO `classprice` VALUES (1,1,1,40.00,0,'2022-08-29 03:09:47','2022-08-30 03:09:47'),(2,1,1,80.00,1,'2022-08-30 03:09:47','2022-09-01 01:10:47'),(3,1,1,120.00,1,'2022-09-01 01:10:47','2022-10-01 03:09:03'),(4,2,2,40.00,1,'2022-10-01 03:09:03','2022-10-02 05:09:47'),(5,2,3,50.00,1,'2022-10-02 05:09:47','2022-10-03 03:45:47'),(6,2,2,60.00,1,'2022-10-03 03:45:47',NULL);
/*!40000 ALTER TABLE `classprice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `destination_view`
--

DROP TABLE IF EXISTS `destination_view`;
/*!50001 DROP VIEW IF EXISTS `destination_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `destination_view` AS SELECT 
 1 AS `routeID`,
 1 AS `destinationID`,
 1 AS `airport_ID`,
 1 AS `destination_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `discountID` int NOT NULL AUTO_INCREMENT,
  `discountClassType` tinyint DEFAULT NULL,
  `amount` decimal(8,2) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `startTimeDate` datetime DEFAULT NULL,
  `endTimeDate` datetime DEFAULT NULL,
  PRIMARY KEY (`discountID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
INSERT INTO `discount` VALUES (1,1,0.05,1,'2022-10-15 05:14:47','2022-10-16 05:14:47'),(2,0,0.09,1,'2022-10-16 05:14:47','2022-10-17 05:14:47'),(3,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `discount_after_update` AFTER UPDATE ON `discount` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update booking set status=0 where booking.discountID=discountID;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `flight`
--

DROP TABLE IF EXISTS `flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight` (
  `flightID` int NOT NULL AUTO_INCREMENT,
  `staticFlightID` int DEFAULT NULL,
  `aircraftID` int DEFAULT NULL,
  `RouteID` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`flightID`),
  KEY `aircraftID` (`aircraftID`),
  KEY `RouteID` (`RouteID`),
  KEY `staticFlightID` (`staticFlightID`),
  CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`aircraftID`) REFERENCES `aircraft` (`aircraftID`),
  CONSTRAINT `flight_ibfk_2` FOREIGN KEY (`RouteID`) REFERENCES `route` (`RouteID`),
  CONSTRAINT `flight_ibfk_3` FOREIGN KEY (`staticFlightID`) REFERENCES `staticflight` (`staticFlightID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight`
--

LOCK TABLES `flight` WRITE;
/*!40000 ALTER TABLE `flight` DISABLE KEYS */;
INSERT INTO `flight` VALUES (1,NULL,1,1,1),(2,NULL,2,2,1),(3,NULL,1,3,1),(4,NULL,3,2,1),(5,NULL,4,1,1),(6,NULL,3,4,1),(7,NULL,5,5,1),(8,NULL,6,2,1),(9,NULL,2,3,1),(10,NULL,7,5,1),(11,NULL,8,2,1),(12,NULL,9,6,1),(13,NULL,10,7,1),(14,NULL,12,8,1),(15,NULL,12,9,1),(16,NULL,13,3,1),(17,NULL,8,2,1),(18,NULL,9,5,1),(19,NULL,5,6,1);
/*!40000 ALTER TABLE `flight` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `flight_after_update` AFTER UPDATE ON `flight` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update flighttime set status=0 where flight.flightID=flightID;
    END IF;
    IF new.status=0 THEN
        Update booking set status=0 where booking.flightID=flightID;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `flighttime`
--

DROP TABLE IF EXISTS `flighttime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flighttime` (
  `flightTimeID` int NOT NULL AUTO_INCREMENT,
  `flightID` int DEFAULT NULL,
  `dispatchTime` datetime DEFAULT NULL,
  `startTimeDate` datetime DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `endTimeDate` datetime DEFAULT NULL,
  PRIMARY KEY (`flightTimeID`),
  KEY `flightID` (`flightID`),
  CONSTRAINT `flighttime_ibfk_1` FOREIGN KEY (`flightID`) REFERENCES `flight` (`flightID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flighttime`
--

LOCK TABLES `flighttime` WRITE;
/*!40000 ALTER TABLE `flighttime` DISABLE KEYS */;
INSERT INTO `flighttime` VALUES (1,1,'2022-08-29 03:20:47','2022-08-29 03:09:47',1,'2022-08-29 03:15:47'),(2,1,'2022-08-29 03:25:47','2022-08-29 03:15:47',1,NULL),(3,2,'2022-09-01 05:15:47','2022-09-01 03:15:47',1,'2022-09-01 05:16:47'),(4,2,'2022-09-01 05:30:47','2022-09-01 05:16:47',1,NULL),(5,5,'2022-09-15 05:16:47','2022-09-15 04:16:47',1,NULL),(6,6,'2022-10-15 05:16:47','2022-10-15 05:10:47',1,'2022-10-15 05:12:47'),(7,6,'2022-10-15 05:20:47','2022-10-15 05:12:47',1,'2022-10-15 05:14:47'),(8,6,'2022-10-15 05:25:47','2022-10-15 05:14:47',1,NULL);
/*!40000 ALTER TABLE `flighttime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
INSERT INTO `guest` VALUES (1,'Kalana','Rajaweera','kalana@gmail.com','fsdfd',1,'1999-08-29'),(2,'Monica','Jayawardana','monica@gmail.com','fdfsdf',0,'1999-10-12'),(3,'Vinul','Fernando','vinul@gmail.com','No77,boraluketiyawaththa,batagoda,galpatha',1,'1999-08-10'),(4,'Jayath','Idunil','jayath@gmail.com','No66,jayathmawatha',1,'1999-08-15'),(5,'Kalpani','Weerasuriya','kalpani@gmail.com','No13,udyanamawatha,kalyana',1,'1999-08-15');
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `level` (
  `levelID` int NOT NULL AUTO_INCREMENT,
  `levelName` varchar(20) DEFAULT NULL,
  `levelrank` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`levelID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (1,'City',2,1),(2,'District',3,1),(3,'Province',4,1),(4,'Country',5,1),(5,'Continent',6,1),(6,'State',1,1),(7,'Commune',0,1),(8,'Region',1,1);
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `level_after_update` AFTER UPDATE ON `level` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update airportleveldetail set status=0 where airportleveldetail.levelID=levelID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `origin_view`
--

DROP TABLE IF EXISTS `origin_view`;
/*!50001 DROP VIEW IF EXISTS `origin_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `origin_view` AS SELECT 
 1 AS `routeID`,
 1 AS `originID`,
 1 AS `airport_ID`,
 1 AS `origin_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `registeredcustomer`
--

DROP TABLE IF EXISTS `registeredcustomer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registeredcustomer` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `password` varchar(70) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registeredcustomer`
--

LOCK TABLES `registeredcustomer` WRITE;
/*!40000 ALTER TABLE `registeredcustomer` DISABLE KEYS */;
INSERT INTO `registeredcustomer` VALUES (1,'Thushalya','weerasuriya','weeratharadva@gmail.com','No77,BoraluketiyaWaththa,batagoda,galpatha','$2b$09$3lJu/oSsl6Qr8GbnXY3V.uy0PWadJv3lqzhQsxAvtQ8.hUkODAl.K',NULL,'/src/images/Image-1656606186078.png',1,'1999-10-11'),(2,'Hasitha','Jayaweera','weeratharava@gmail.com','ffaf','$2b$09$UIwiWc3oxKs67bd8GtCZmetpFpDgqBQofsT8dpPaq22yRJr3xQiYe',NULL,NULL,1,'1999-10-12'),(3,'Pasfd','adooo','weeratharav@gmail.com','fsaff','$2b$09$mOFZlogZ60YNoVDil8tV2.7tUFV87IMYjTM0R2V/PJQHa01K9lk86',NULL,'/src/images/Image-1656603596538.jpeg',2,'1999-10-02'),(4,'Vinul','Fernando','weerathara@gmail.com','fdsfsdf','$2b$09$DeskUDQF9TMs8yq/EwJNRu.PjyXyNTlIdfLYI1vFFWdJWglldhY4a',NULL,NULL,1,'1999-10-12'),(5,'hhg','mama','weerathar@gmail.com','hello','$2b$09$P18zA37X9dwYYZX36xz3gufGfoI.tCIwezwiDTKcoxvbKSCPBcyby',NULL,'/src/images/Image-1656577933501.png',1,'1999-10-11'),(6,'Thushalya','weerasuriya','manager@gmail.com','dfsdf','$2b$09$r5dR9vhsWp8bmMOCoc7j8uNhbwCH0okxet5FY93S3IYBMnPOiPEj6',NULL,NULL,1,'1999-10-12'),(7,'vinul','Fernando','registercustomer@gmail.com','fdsf','$2b$09$yTv581ZeZskdE7TdFv8AgunVclgWzqVRX4qxiOKWI3ueH7/1zzlWm',NULL,NULL,0,'1999-10-12'),(8,'Amila','Aponzo','registercustomer1@gmail.com','fdf','$2b$09$4CMyk2z.cmFqliqJkdVkgO8A/M/GJKNztRusIonU5RzbG90qnaR6W',NULL,NULL,0,'1999-10-12'),(9,'Ravindu','Palansooriya','ravindu@gmail.com','fdfdfsd','$2b$09$Jaaw8mrc87gb9xDHmTvXM.N2I4A3zPbmb0WPMiJc5d0zkE0Fs3uPO',NULL,NULL,0,'1999-10-12');
/*!40000 ALTER TABLE `registeredcustomer` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `registeredcustomer_after_update` AFTER UPDATE ON `registeredcustomer` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update booking set status=0 where booking.registeredUserID=userID;
    END IF;
    IF new.status=0 THEN
        Update userphone set status=0 where userphone.registeredUserID=userID;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `RouteID` int NOT NULL AUTO_INCREMENT,
  `OriginID` int DEFAULT NULL,
  `DestinationID` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`RouteID`),
  KEY `DestinationID` (`DestinationID`),
  KEY `OriginID` (`OriginID`),
  CONSTRAINT `route_ibfk_1` FOREIGN KEY (`DestinationID`) REFERENCES `airport` (`airport_id`),
  CONSTRAINT `route_ibfk_2` FOREIGN KEY (`OriginID`) REFERENCES `airport` (`airport_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,1,2,1),(2,2,3,1),(3,4,5,1),(4,1,5,1),(5,6,7,1),(6,5,1,1),(7,7,3,1),(8,6,1,1),(9,2,8,1),(10,4,9,1);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `route_after_update` AFTER UPDATE ON `route` FOR EACH ROW BEGIN
    IF new.status=0 THEN
        Update classprice set status=0 where classprice.RouteID=RouteID;
    END IF;
    IF new.status=0 THEN
        Update flight set status=0 where flight.RouteID=RouteID;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `staticflight`
--

DROP TABLE IF EXISTS `staticflight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staticflight` (
  `staticFlightID` int NOT NULL AUTO_INCREMENT,
  `aircraftID` int NOT NULL,
  `RouteID` int NOT NULL,
  `dispatchTime` datetime NOT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`staticFlightID`),
  KEY `aircraftID` (`aircraftID`),
  KEY `RouteID` (`RouteID`),
  CONSTRAINT `staticflight_ibfk_1` FOREIGN KEY (`aircraftID`) REFERENCES `aircraft` (`aircraftID`),
  CONSTRAINT `staticflight_ibfk_2` FOREIGN KEY (`RouteID`) REFERENCES `route` (`RouteID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staticflight`
--

LOCK TABLES `staticflight` WRITE;
/*!40000 ALTER TABLE `staticflight` DISABLE KEYS */;
/*!40000 ALTER TABLE `staticflight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userphone`
--

DROP TABLE IF EXISTS `userphone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userphone` (
  `userPhoneID` int NOT NULL AUTO_INCREMENT,
  `registeredUserID` int DEFAULT NULL,
  `guestUserID` int DEFAULT NULL,
  `authUserID` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`userPhoneID`),
  KEY `registeredUserID` (`registeredUserID`),
  KEY `guestUserID` (`guestUserID`),
  KEY `authUserID` (`authUserID`),
  CONSTRAINT `userphone_ibfk_1` FOREIGN KEY (`registeredUserID`) REFERENCES `registeredcustomer` (`userID`),
  CONSTRAINT `userphone_ibfk_2` FOREIGN KEY (`guestUserID`) REFERENCES `guest` (`userID`),
  CONSTRAINT `userphone_ibfk_3` FOREIGN KEY (`authUserID`) REFERENCES `authorizeduser` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userphone`
--

LOCK TABLES `userphone` WRITE;
/*!40000 ALTER TABLE `userphone` DISABLE KEYS */;
INSERT INTO `userphone` VALUES (1,1,NULL,NULL,1,'0754365392'),(2,2,NULL,NULL,1,'0754365392'),(3,3,NULL,NULL,1,'0754365392'),(4,4,NULL,NULL,1,'0754365392'),(5,5,NULL,NULL,1,'0754365392'),(6,6,NULL,NULL,1,'0718148961'),(7,7,NULL,NULL,1,'0754365392'),(8,8,NULL,NULL,1,'0718148961'),(9,9,NULL,NULL,1,'0718148961'),(10,NULL,NULL,2,1,'0342251729');
/*!40000 ALTER TABLE `userphone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bairways'
--

--
-- Dumping routines for database 'bairways'
--

--
-- Final view structure for view `destination_view`
--

/*!50001 DROP VIEW IF EXISTS `destination_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `destination_view` AS select `route`.`RouteID` AS `routeID`,`route`.`DestinationID` AS `destinationID`,`airport`.`airport_id` AS `airport_ID`,`airport`.`name` AS `destination_name` from (`route` left join `airport` on((`route`.`DestinationID` = `airport`.`airport_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `origin_view`
--

/*!50001 DROP VIEW IF EXISTS `origin_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `origin_view` AS select `route`.`RouteID` AS `routeID`,`route`.`OriginID` AS `originID`,`airport`.`airport_id` AS `airport_ID`,`airport`.`name` AS `origin_name` from (`route` left join `airport` on((`route`.`OriginID` = `airport`.`airport_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-02 16:43:33
