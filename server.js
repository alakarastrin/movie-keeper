const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load env
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route
const movies = require("./routes/movies");
const actors = require("./routes/actors");
const accounts = require("./routes/accounts");
const profiles = require("./routes/profiles");

const app = express();

app.use(express.json());

// logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/movies", movies);
app.use("/api/v1/actors", actors);
app.use("/api/v1/accounts", accounts);
app.use("/api/v1/profiles", profiles);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
