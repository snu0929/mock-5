const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { employeeRouter } = require("./routes/employee.routes");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/employee", employeeRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the database");
    console.log(`Server running on port efficently ${process.env.port}`);
  } catch (err) {
    console.error(err);
    console.log("Something went wrong");
  }
});
