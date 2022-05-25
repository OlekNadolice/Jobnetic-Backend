const mongoose = require("mongoose");

const db = process.env.DATEBASE_URL;

mongoose.connect(db, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connection Established :)");
  }
});

module.exports = db;
