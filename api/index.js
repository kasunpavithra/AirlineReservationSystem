const express = require('express');
const mysql = require("mysql");
const siteRouter = require("./routes/site");


const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use("/api",siteRouter);


app.listen(3001,()=>{
    console.log("Running server");
})