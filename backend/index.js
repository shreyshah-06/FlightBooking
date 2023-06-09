const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const flightRoute = require("./routes/flightOperations");
const cors = require("cors");
const dbconnect = require("./db/dbconnect.js");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", authRoute);
app.use("/", flightRoute);

const serverStart = async () => {
    try {
        await dbconnect(process.env.MONGO_URI);
        console.log("Connected to the DB");
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  serverStart();

