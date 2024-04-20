const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors=require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Route imports 
const pincode = require("./routes/pincodeRoute");

app.use("/api/v1", pincode);

// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;