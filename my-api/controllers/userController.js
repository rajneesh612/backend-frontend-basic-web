
const { Pool } = require('pg');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getUsers = async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM users"
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

const createUser = async (req, res) => {

  try {

    const { name , password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users(name, password) VALUES($1, $2) RETURNING *",
      [name, hashedPassword]
    );

    res.json({
      message: "User added",
      user: result.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


const loginUser = async (req, res) => {
  console.log(req.body);

  try {

    const { name, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE name = $1",
      [name]
    );

    const user = result.rows[0];

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password"
      });

    }

    const token = jwt.sign(

  {
    id: user.id,
    name: user.name,
  },

  process.env.JWT_SECRET,

  {
    expiresIn: "1h",
  }

);

res.json({
  message: "Login successful",
  token,
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

const getProfile = async (req, res) => {

  try {

    const userId = req.user.id;

    const result = await pool.query(
      "SELECT id, name FROM users WHERE id = $1",
      [userId]
    );

    res.json(result.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

const deleteUser = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );

    res.json({
      message: "User deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


const updateUser = async (req, res) => {

  try {

    const { id } = req.params;

    const { name } = req.body;

    const result = await pool.query(
      "UPDATE users SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    res.json({
      message: "User updated",
      user: result.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  getProfile,
};