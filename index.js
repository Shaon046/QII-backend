const express = require("express");
const { connectDB } = require("./config/db");
const cors = require('cors');
const signup = require("./routes/signup");
const getAllUser = require("./routes/getAllUsers");
const login=require("./routes/login")
var cookieParser = require('cookie-parser')

const app = express();
require("dotenv").config();

const port = process.env.PORT;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Database Connection
connectDB().then(console.log).catch(console.error);

//routes
app.use(signup);
app.use(getAllUser);
app.use(login)

app.listen(port, (err) => {
  if (err) {
    console.log("Server is offline");
  } else {
    console.log(`Server is running at ${port}`);
  }
});
