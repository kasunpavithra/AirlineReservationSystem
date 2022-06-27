-- drop database bairways;
create database bairways;
use bairways;

CREATE TABLE `RegisteredCustomer` (
 `userID` INT(5) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(20),
  `lastname` VARCHAR(20),
  `email` VARCHAR(50),
  `address` VARCHAR(255),
  `password` VARCHAR(70),
  `status` TINYINT(4),
  `image` VARCHAR(255),
  `gender` TINYINT(4),
  `birthday` DATE,
 PRIMARY KEY (`userID`)
  );


CREATE TABLE `Guest` (
 `userID` INT(5) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(20),
  `lastname` VARCHAR(20),
  `email` VARCHAR(50),
  `address` VARCHAR(255),
`gender` TINYINT,
  `birthday` DATE,
 PRIMARY KEY (`userID`)
  );


CREATE TABLE `authorizedUser` (
  `userID` INT(5) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(20),
  `lastname` VARCHAR(20),
  `email` VARCHAR(50),
  `address` VARCHAR(255),
  `password` VARCHAR(100),
  `status` TINYINT(4),
  `type` TINYINT(4),
  `image` BLOB,
 PRIMARY KEY (`userID`)
);


CREATE TABLE `userPhone` (
  `userPhoneID` INT(5) NOT NULL AUTO_INCREMENT,
  `registeredUserID` INT(5),
  `guestUserID` INT(5),
  `authUserID` INT(5),
  `phoneNumber` VARCHAR(15),
  PRIMARY KEY (`userPhoneID`),
  FOREIGN KEY (`registeredUserID`) REFERENCES `RegisteredCustomer`(`userID`),
FOREIGN KEY (`guestUserID`) REFERENCES `Guest`(`userID`),
FOREIGN KEY (`authUserID`) REFERENCES `authorizedUser`(`userID`)
);


CREATE TABLE `Discount` (
  `discountID` INT(5) NOT NULL AUTO_INCREMENT,
  `discountClassType` TINYINT(4),
  `amount` decimal(8,2) ,
  `startTimeDate` datetime,
  `endTimeDate` datetime,
  PRIMARY KEY (`discountID`)
);


CREATE TABLE `aircraftType` (
  `aircraftTypeID` INT(5) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20),
  `description` VARCHAR(255),
  `image` BLOB,
  PRIMARY KEY (`aircraftTypeID`)
);


CREATE TABLE `airCraft` (
  `aircraftID` INT(5) NOT NULL AUTO_INCREMENT,
  `aircraftTypeID` INT(5),
  `EconomySeatCount` INT(3),
  `BusinessSeatCount` INT(3),
  `PlanitnumSeatCount` INT(3),
  PRIMARY KEY (`aircraftID`),
  FOREIGN KEY (`aircraftTypeID`) REFERENCES `aircraftType`(`aircraftTypeID`)
);


CREATE TABLE `class` (
  `classID` INT(5) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20),
  PRIMARY KEY (`classID`)
);


CREATE TABLE `airCraftSeat` (
  `airCraftseatID` INT(5) NOT NULL AUTO_INCREMENT,
  `airCrafftID` INT(5),
  `classID` INT(5),
  `xCord` INT(1),
  `yCord` INT(2),
  `seatNumber` INT(3),
  PRIMARY KEY (`airCraftseatID`),
  FOREIGN KEY (`airCrafftID`) REFERENCES `airCraft`(`aircraftID`),
  FOREIGN KEY (`classID`) REFERENCES `class`(`classID`)
);


CREATE TABLE `AirPort` (
  `airport_id` INT(5) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20),
  PRIMARY KEY (`airport_id`)
);


CREATE TABLE `level` (
  `levelID` INT(5) NOT NULL AUTO_INCREMENT,
  `levelName` VARCHAR(20),
  `levelrank` INT(2),
  PRIMARY KEY (`levelID`)
);


CREATE TABLE `airportlevelDetail` (
  `airportlevelDetailID` INT(5) NOT NULL AUTO_INCREMENT,
  `airport_id` INT(5),
  `levelID` INT(5),
  `value` VARCHAR(20),
  PRIMARY KEY (`airportlevelDetailID`),
  FOREIGN KEY (`levelID`) REFERENCES `level`(`levelID`),
  FOREIGN KEY (`airport_id`) REFERENCES `AirPort`(`airport_id`)
);


CREATE TABLE `Route` (
  `RouteID` INT(5) NOT NULL AUTO_INCREMENT,
  `OriginID` INT(5),
  `DestinationID` INT(5),
  PRIMARY KEY (`RouteID`),
  FOREIGN KEY (`DestinationID`) REFERENCES `AirPort`(`airport_id`),
  FOREIGN KEY (`OriginID`) REFERENCES `AirPort`(`airport_id`)
);

CREATE TABLE `bairways2`.`staticflight` ( `staticFlightID` INT(5) NOT NULL AUTO_INCREMENT , `aircraftID` INT(5) NOT NULL , `RouteID` INT(5) NOT NULL , `dispatchTime` DATETIME NOT NULL , PRIMARY KEY (`staticFlightID`),FOREIGN KEY (`aircraftID`) REFERENCES `airCraft`(`aircraftID`),FOREIGN KEY (`RouteID`) REFERENCES `Route`(`RouteID`)) ENGINE = InnoDB;




CREATE TABLE `flight` (
  `flightID` INT(5) NOT NULL AUTO_INCREMENT,
  `staticFlightID` INT(5),
  `aircraftID` INT(5),
  `RouteID` INT(5),
  PRIMARY KEY (`flightID`),
  FOREIGN KEY (`aircraftID`) REFERENCES `airCraft`(`aircraftID`),
  FOREIGN KEY (`RouteID`) REFERENCES `Route`(`RouteID`),
  FOREIGN KEY (`staticFlightID`) REFERENCES `staticflight`(`staticFlightID`)
);


CREATE TABLE `FlightTime` (
  `flightTimeID`INT(5) NOT NULL AUTO_INCREMENT,
  `flightID` INT(5),
  `dispatchTime` DATETIME,
  `startTimeDate` DATETIME,
  `endTimeDate` DATETIME,
  PRIMARY KEY (`flightTimeID`),
  FOREIGN KEY (`flightID`) REFERENCES `flight`(`flightID`)
);




CREATE TABLE `classPrice` (
  `classPriceID` INT(5),
  `RouteID` INT(5),
  `classID` INT(5),
  `Price` decimal(8,2),
  `startTimeDate` DATETIME,
  `endTimeDate` DATETIME,
  PRIMARY KEY (`classPriceID`),
  FOREIGN KEY (`RouteID`) REFERENCES `Route`(`RouteID`),
FOREIGN KEY (`classID`) REFERENCES `Class`(`classID`)
);


CREATE TABLE `Booking` (
  `bookingID` INT(5),
  `registeredUserID` INT(5),
  `guestUserID` INT(5),
  `flightID` INT(5),
  `paymentStatus` TINYINT,
  `bookingTimeDate` DATETIME,
  `classID` INT(5),
  `airCraftseatID` INT(5),
  `status` TINYINT,
  `discountID` INT(5),
  `under18` TINYINT,
  PRIMARY KEY (`bookingID`),
  FOREIGN KEY (`discountID`) REFERENCES `Discount`(`discountID`),
  FOREIGN KEY (`airCraftseatID`) REFERENCES `airCraftSeat`(`airCraftseatID`),
  FOREIGN KEY (`classID`) REFERENCES `class`(`classID`),
FOREIGN KEY (`flightID`) REFERENCES `flight`(`flightID`),
FOREIGN KEY (`registeredUserID`) REFERENCES `RegisteredCustomer`(`userID`),
FOREIGN KEY (`guestUserID`) REFERENCES `Guest`(`userID`)
  
);


--
-- Structure for view `country_airport`
--
DROP TABLE IF EXISTS `country_airport`;

CREATE  VIEW `country_airport`  AS  (select `airportleveldetail`.`levelID` AS `levelID`,`airport`.`airport_id` AS `airport_id`,`airport`.`name` AS `name`,`airportleveldetail`.`airportlevelDetailID` AS `airportlevelDetailID`,`airportleveldetail`.`value` AS `value`,`level`.`levelName` AS `levelName`,`level`.`levelrank` AS `levelrank` from ((`airport` join `airportleveldetail` on(`airport`.`airport_id` = `airportleveldetail`.`airport_id`)) left join `level` on(`airportleveldetail`.`levelID` = `level`.`levelID`)) where `level`.`levelrank` = 2) ;


DROP TABLE IF EXISTS `destination_view`;

CREATE  VIEW `destination_view`  AS  (select `route`.`RouteID` AS `routeID`,`route`.`DestinationID` AS `destinationID`,`airport`.`airport_id` AS `airport_ID`,`airport`.`name` AS `destination_name` from (`route` left join `airport` on(`route`.`DestinationID` = `airport`.`airport_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `origin_view`
--
DROP TABLE IF EXISTS `origin_view`;

CREATE  VIEW `origin_view`  AS  (select `route`.`RouteID` AS `routeID`,`route`.`OriginID` AS `originID`,`airport`.`airport_id` AS `airport_ID`,`airport`.`name` AS `origin_name` from (`route` left join `airport` on(`route`.`OriginID` = `airport`.`airport_id`))) ;

