const { getAllUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/Auth");
const express = require("express");
const router = express.Router();

router.get("/allusers", authMiddleware, getAllUser);

module.exports = router;
