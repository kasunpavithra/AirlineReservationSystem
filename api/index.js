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
const dotenv = require("dotenv");

const app = express();

const cors = require('cors');
const coresOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3001;

dotenv.config();
app.use(express.json());
app.use(cors(coresOptions));


//Routes
app.use("/api",siteRouter);

app.use("/api/registered-customer", registeredCustomerRoutes);
app.use("/api/authorized-user", authorizedUserRoutes);
app.use("/api/bookings", bookingRouter);
app.use("/api/routes", airWayRoutesRouter);
app.use("/api/airport", airportRouter);

app.use("/api/flights", flightRoutes);
app.use("/api/airCraft",airCraftRoute);


app.listen(3001,()=>{
    console.log(`Server started on port ${PORT}`);
})

