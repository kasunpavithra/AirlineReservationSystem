const express = require('express');
const mysql = require("mysql");
const siteRouter = require("./routes/site");
const registeredCustomerRoutes = require('./routes/registeredCustomerRoutes')
const authorizedUserRoutes = require("./routes/authorizedUserRoutes")

const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use("/api",siteRouter);
app.use("/api/registered-customer", registeredCustomerRoutes);
app.use("/api/authorized-user", authorizedUserRoutes);

app.listen(3001,()=>{
    console.log("Running server");
})