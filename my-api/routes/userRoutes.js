const express = require("express");

const router = express.Router();

const validateUser = require("../middleware/validateUser");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");

router.get("/", getUsers);

router.post("/", validateUser, createUser);

router.post("/login", loginUser);

router.get("/profile",authMiddleware,getProfile);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

module.exports = router;