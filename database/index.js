const mongoose = require('mongoose')

const username = "larissabernardon";
const password = "dbPassword123";
const cluster = "cluster0.6xnws3f";

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});