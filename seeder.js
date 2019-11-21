const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Movie = require("./models/Movie");
const Actor = require("./models/Actor");
const Account = require("./models/Account");
const Profile = require("./models/Profile");
const Comment = require("./models/Comment");

console.log("Loading...");

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read json files
const movies = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/movies.json`, "utf-8")
);
const actors = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/actors.json`, "utf-8")
);
const accounts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/accounts.json`, "utf-8")
);
const profiles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/profiles.json`, "utf-8")
);
const comments = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/comments.json`, "utf-8")
);

// Import into database
const importData = async () => {
  try {
    await Movie.create(movies);
    await Actor.create(actors);
    await Account.create(accounts);
    await Profile.create(profiles);
    await Comment.create(comments);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data from database
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    await Actor.deleteMany();
    await Account.deleteMany();
    await Profile.deleteMany();
    await Comment.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
