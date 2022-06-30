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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircraft`
--

LOCK TABLES `aircraft` WRITE;
/*!40000 ALTER TABLE `aircraft` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircraftseat`
--

LOCK TABLES `aircraftseat` WRITE;
/*!40000 ALTER TABLE `aircraftseat` DISABLE KEYS */;
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
  `description` varchar(255) DEFAULT NULL,
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
INSERT INTO `aircrafttype` VALUES (1,'Boeing 737','High metal material aircraft',NULL,NULL),(2,'Boeing 757','High metal material aircraft',NULL,NULL),(3,'Airbus A380','Low metal material aircraft',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airportleveldetail`
--

LOCK TABLES `airportleveldetail` WRITE;
/*!40000 ALTER TABLE `airportleveldetail` DISABLE KEYS */;
INSERT INTO `airportleveldetail` VALUES (1,1,1,'2',0),(2,1,1,'2',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'hello',0),(2,'hi',0);
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
INSERT INTO `classprice` VALUES (1,1,1,40.00,0,'2022-08-29 03:09:47','2022-08-29 03:09:48');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight`
--

LOCK TABLES `flight` WRITE;
/*!40000 ALTER TABLE `flight` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flighttime`
--

LOCK TABLES `flighttime` WRITE;
/*!40000 ALTER TABLE `flighttime` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (1,'hello',1,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,1,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userphone`
--

LOCK TABLES `userphone` WRITE;
/*!40000 ALTER TABLE `userphone` DISABLE KEYS */;
INSERT INTO `userphone` VALUES (1,1,NULL,NULL,NULL,'0754365392'),(2,2,NULL,NULL,NULL,'0754365392'),(3,3,NULL,NULL,NULL,'0754365392'),(4,4,NULL,NULL,NULL,'0754365392'),(5,5,NULL,NULL,NULL,'0754365392'),(6,6,NULL,NULL,NULL,'0718148961'),(7,7,NULL,NULL,NULL,'0754365392'),(8,8,NULL,NULL,NULL,'0718148961'),(9,9,NULL,NULL,NULL,'0718148961');
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

-- Dump completed on 2022-07-01  1:46:23
