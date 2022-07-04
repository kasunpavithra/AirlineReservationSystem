const express = require("express");
const mysql = require("mysql");
const siteRouter = require("./routes/site");
const registeredCustomerRoutes = require("./routes/registeredCustomerRoutes");
const bookingRouter = require("./routes/bookings");
const authorizedUserRoutes = require("./routes/authorizedUserRoutes");
const airWayRoutesRouter = require("./routes/airWayRoutesRouter");
const airportRouter = require("./routes/airportRouter");
const flightRoutes = require("./routes/flightRoutes");
const airCraftRoute = require("./routes/airCraftRoutes");
const guest=require("./routes/guestRoutes")
const airCraftTypeRoutes = require("./routes/airCraftTypeRoutes")
const airCraftSeatRoutes = require("./routes/airCraftSeatRoutes")
const classRoutes = require("./routes/classRoutes")
const userPhoneRoutes = require("./routes/userPhoneRoutes")
const authROuter = require("./routes/auth");
const levelRouter = require("./routes/levelRouter");
const airportInfoRouter = require("./routes/airportLevelDetailRouter");
const classPriceRouter = require('./routes/classPriceRouter');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const coresOptions = require('./config/corsOptions');

const app = express();


dotenv.config();
app.use(express.json());
app.use(cors(coresOptions));

//midleware for cookies
app.use(cookieParser());


//Routes
app.use("/api",siteRouter);
app.use("/api/auth",authROuter);

app.use("/api/registered-customer", registeredCustomerRoutes);
app.use("/api/authorized-user", authorizedUserRoutes);
app.use("/api/bookings", bookingRouter);
app.use("/api/routes", airWayRoutesRouter);
app.use("/api/airport", airportRouter);
app.use("/api/airportInfo", airportInfoRouter);
app.use("/api/classPrice", classPriceRouter);

app.use("/api/flights", flightRoutes);
app.use("/api/airCraft",airCraftRoute);
app.use("/api/guest",guest);
app.use("/api/level",levelRouter);
app.use("/api/airCraftType", airCraftTypeRoutes)
app.use("/api/airCraftSeat", airCraftSeatRoutes)
app.use("/api/class", classRoutes)
app.use("/api/userPhone", userPhoneRoutes)


const PORT = process.env.PORT || 3001;
app.listen(3001,()=>{
    console.log(`Server started on port ${PORT}`);
})

