const { getDB } = require("../config/db");
const jwt = require("jsonwebtoken");

JWT_SECRET = process.env.JWT_SECRET;

////log in

const login = async (req, res) => {
  try {
    if (req.body.email !== "" && req.body.password !== "") {
      const db = getDB();
      const user = await db.collection("users").findOne({
        email: req.body.email,
        password: req.body.password,
      });

      if (user) {
        let token = jwt.sign(
          { email: req.body.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "10h",
          }
        );
        res.status(200).send(JSON.stringify({ user, token }));
      } else {
        res.status(404).send(JSON.stringify({ message: "no user found" }));
      }
    } else {
      req.status(400).send(JSON.stringify({ message: "Invalid input" }));
    }
  } catch (err) {
    res.status(500).send(JSON.stringify({ message: err }));
    console.log(err);
  }
};

//signupController

const signupController = async (req, res) => {
  try {
    if (
      req.body.name &&
      req.body.name.trim() !== "" &&
      req.body.dob &&
      req.body.dob.trim() !== "" &&
      req.body.email &&
      req.body.email.trim() !== "" &&
      req.body.password &&
      req.body.password.trim() !== ""
    ) {
      const userCollection = "users";
      const userInput = req.body;

      ////this part will check if user email exist
      const db = getDB();
      const checkUserExist = await db
        .collection("users")
        .findOne({ email: req.body.email });

      if (checkUserExist) {
        res.send(JSON.stringify({ message: "user already exist" }));
      } else {
        //user creation part

        db.collection(userCollection).insertOne(userInput);

        let token = jwt.sign(
          { email: req.body.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "10h",
          }
        );

        res
          .status(201)
          .send(JSON.stringify({ message: "new user registered", token }));
      }
    } else {
      res
        .status(406)
        .send(JSON.stringify({ message: "please provide all details" }));
    }
  } catch (err) {
    res.status(500).send(JSON.stringify({ message: err }));
    throw err;
  }
};

////get all users

const getAllUser = async (req, res) => {
  try {
    if (req.user !== "") {
      const db = getDB();
      const users = await db.collection("users").find().toArray();
      res
        .status(200)
        .send(JSON.stringify({ users: users, message: "success" }));
    } else {
      res.status().send(JSON.stringify({ message: "Access denied" }));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = { signupController, getAllUser, login };
