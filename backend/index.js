// import express from "express";
const connectToMongo = require('./db');

const express = require("express");
connectToMongo();

const jwt = require('jsonwebtoken')
require("dotenv").config();
const cors = require("cors");
const bcrypt = require('bcrypt');
const User = require('./models/User')
const app = express();
const port = process.env.PORT || 6969
app.use(express.json());
app.use(cors());



// // Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))






app.get("/", (req, res) => {
    res.send(" server working")
})

app.listen(port, () => {
    console.log("started")
})