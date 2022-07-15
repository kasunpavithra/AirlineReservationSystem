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
const staticFlightRoute = require("./routes/staticFlightRoute");
const discountRoutes = require("./routes/discountRoutes");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const coresOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const ROLES_LIST = require("./config/rolesList");
const verifyRoles = require("./middleware/verifyRoles");

const app = express();


dotenv.config();

app.use(credentials);
app.use(cors(coresOptions));


app.use(express.json());

//midleware for cookies
app.use(cookieParser());


//Routes
app.use("/api",siteRouter);
app.use("/api/auth",authROuter);

app.use("/api/registered-customer",verifyJWT,verifyRoles(ROLES_LIST.Admin), registeredCustomerRoutes);
app.use("/api/authorized-user",verifyJWT,verifyRoles(ROLES_LIST.Admin), authorizedUserRoutes);
app.use("/api/bookings", bookingRouter);
app.use("/api/routes", airWayRoutesRouter);
app.use("/api/airport",airportRouter);
app.use("/api/airportInfo",verifyJWT,verifyRoles(ROLES_LIST.Manager), airportInfoRouter);
app.use("/api/classPrice",verifyJWT,verifyRoles(ROLES_LIST.Manager), classPriceRouter);

app.use("/api/flights", flightRoutes);

app.use("/api/airCraft",airCraftRoute);
app.use("/api/guest",guest);
app.use("/api/level",verifyJWT,verifyRoles(ROLES_LIST.Manager),levelRouter);
app.use("/api/airCraftType",verifyJWT,verifyRoles(ROLES_LIST.Manager), airCraftTypeRoutes)
app.use("/api/airCraftSeat", airCraftSeatRoutes)
app.use("/api/class",verifyJWT,verifyRoles(ROLES_LIST.RegisteredUser), classRoutes)
app.use("/api/userPhone",verifyJWT,verifyRoles(ROLES_LIST.RegisteredUser), userPhoneRoutes)
app.use("/api/staticFlight",verifyJWT, verifyRoles(ROLES_LIST.Manager),staticFlightRoute);
app.use("/api/discount",verifyJWT,verifyRoles(ROLES_LIST.Manager), discountRoutes)

const PORT = process.env.PORT || 3001;
app.listen(3001,()=>{
    console.log(`Server started on port ${PORT}`);
})

