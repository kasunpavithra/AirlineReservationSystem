drop database bairways;
create database bairways;
use bairways;

CREATE TABLE `RegisteredCustomer` (
 `userID` VARCHAR(5),
  `firstname` VARCHAR(20),
  `lastname` VARCHAR(20),
  `email` VARCHAR(50),
  `address` VARCHAR(255),
  `password` VARCHAR(70),
  `status` TINYINT(4),
  `image` BLOB,
  `gender` TINYINT(4),
  `birthday` DATE,
 PRIMARY KEY (`userID`)
  );


CREATE TABLE `Guest` (
 `userID` VARCHAR(5),
  `firstname` VARCHAR(20),
  `lastname` VARCHAR(20),
  `email` VARCHAR(50),
  `address` VARCHAR(255),
`gender` TINYINT,
  `birthday` DATE,
 PRIMARY KEY (`userID`)
  );


CREATE TABLE `authorizedUser` (
  `userID` VARCHAR(5),
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
  `userPhoneID` VARCHAR(5),
  `userID` VARCHAR(5),
  `phoneNumber` VARCHAR(15),
  PRIMARY KEY (`userPhoneID`),
  FOREIGN KEY (`userID`) REFERENCES `RegisteredCustomer`(`userID`),
FOREIGN KEY (`userID`) REFERENCES `Guest`(`userID`),
FOREIGN KEY (`userID`) REFERENCES `authorizedUser`(`userID`)
);


CREATE TABLE `Discount` (
  `discountID` VARCHAR(5),
  `discountClassType` TINYINT(4),
  `amount` decimal(8,2) ,
  `startTimeDate` datetime,
  `endTimeDate` datetime,
  PRIMARY KEY (`discountID`)
);


CREATE TABLE `aircraftType` (
  `aircraftTypeID` VARCHAR(5),
  `name` VARCHAR(20),
  `description` VARCHAR(255),
  `image` BLOB,
  PRIMARY KEY (`aircraftTypeID`)
);


CREATE TABLE `airCraft` (
  `aircraftID` VARCHAR(5),
  `aircraftTypeID` VARCHAR(5),
  `EconomySeatCount` INT(3),
  `BusinessSeatCount` INT(3),
  `PlanitnumSeatCount` INT(3),
  PRIMARY KEY (`aircraftID`),
  FOREIGN KEY (`aircraftTypeID`) REFERENCES `aircraftType`(`aircraftTypeID`)
);


CREATE TABLE `class` (
  `classID` VARCHAR(5),
  `name` VARCHAR(20),
  PRIMARY KEY (`classID`)
);


CREATE TABLE `airCraftSeat` (
  `airCraftseatID` VARCHAR(5),
  `airCrafftID` VARCHAR(5),
  `classID` VARCHAR(5),
  `xCord` INT(1),
  `yCord` INT(2),
  `seatNumber` INT(3),
  PRIMARY KEY (`airCraftseatID`),
  FOREIGN KEY (`airCrafftID`) REFERENCES `airCraft`(`aircraftID`),
  FOREIGN KEY (`classID`) REFERENCES `class`(`classID`)
);


CREATE TABLE `AirPort` (
  `airport_id` VARCHAR(5),
  `name` VARCHAR(20),
  PRIMARY KEY (`airport_id`)
);


CREATE TABLE `level` (
  `levelID` VARCHAR(5),
  `levelName` VARCHAR(20),
  `levelrank` INT(2),
  PRIMARY KEY (`levelID`)
);


CREATE TABLE `airportlevelDetail` (
  `airportlevelDetailID` VARCHAR(5),
  `airport_id` VARCHAR(5),
  `levelID` VARCHAR(5),
  `value` VARCHAR(20),
  PRIMARY KEY (`airportlevelDetailID`),
  FOREIGN KEY (`levelID`) REFERENCES `level`(`levelID`),
  FOREIGN KEY (`airport_id`) REFERENCES `AirPort`(`airport_id`)
);


CREATE TABLE `Route` (
  `RouteID` VARCHAR(5),
  `OriginID` VARCHAR(5),
  `DestinationID` VARCHAR(5),
  PRIMARY KEY (`RouteID`),
  FOREIGN KEY (`DestinationID`) REFERENCES `AirPort`(`airport_id`),
  FOREIGN KEY (`OriginID`) REFERENCES `AirPort`(`airport_id`)
);


CREATE TABLE `flight` (
  `flightID` VARCHAR(5),
  `aircraftID` VARCHAR(5),
  `RouteID` VARCHAR(5),
  PRIMARY KEY (`flightID`),
  FOREIGN KEY (`aircraftID`) REFERENCES `airCraft`(`aircraftID`),
  FOREIGN KEY (`RouteID`) REFERENCES `Route`(`RouteID`)
);


CREATE TABLE `FlightTime` (
  `flightTimeID`VARCHAR(5),
  `flightID` VARCHAR(5),
  `dispatchTime` DATETIME,
  `startTimeDate` DATETIME,
  `endTimeDate` DATETIME,
  PRIMARY KEY (`flightTimeID`),
  FOREIGN KEY (`flightID`) REFERENCES `flight`(`flightID`)
);




CREATE TABLE `classPrice` (
  `classPriceID` VARCHAR(5),
  `RouteID` VARCHAR(5),
  `classID` VARCHAR(5),
  `Price` decimal(8,2),
  `startTimeDate` DATETIME,
  `endTimeDate` DATETIME,
  PRIMARY KEY (`classPriceID`),
  FOREIGN KEY (`RouteID`) REFERENCES `Route`(`RouteID`),
FOREIGN KEY (`classID`) REFERENCES `Class`(`classID`)
);


CREATE TABLE `Booking` (
  `bookingID` VARCHAR(5),
  `userID` VARCHAR(5),
  `flightID` VARCHAR(5),
  `paymentStatus` TINYINT,
  `bookingTimeDate` DATETIME,
  `classID` VARCHAR(5),
  `airCraftseatID` VARCHAR(5),
  `status` TINYINT,
  `discountID` VARCHAR(5),
  PRIMARY KEY (`bookingID`),
  FOREIGN KEY (`discountID`) REFERENCES `Discount`(`discountID`),
  FOREIGN KEY (`airCraftseatID`) REFERENCES `airCraftSeat`(`airCraftseatID`),
  FOREIGN KEY (`classID`) REFERENCES `class`(`classID`),
FOREIGN KEY (`flightID`) REFERENCES `flight`(`flightID`),
FOREIGN KEY (`userID`) REFERENCES `RegisteredCustomer`(`userID`),
FOREIGN KEY (`userID`) REFERENCES `Guest`(`userID`)
  
);


