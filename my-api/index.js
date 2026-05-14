require("dotenv").config();

const cors = require("cors");

const express = require("express");

const userRoutes = require("./routes/userRoutes");

const logger = require("./middleware/logger");

const app = express();

app.use(cors());

app.use(express.json());

app.use(logger);

app.use("/users", userRoutes);



app.get("/", (req, res) => {
  res.send("API chal rahi hai");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});