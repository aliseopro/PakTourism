const express = require("express");
const mongoose = require("mongoose");
//const Router = require("./routes")
const app = express();
app.use(express.json());

//db variables
const username = "zelda";
const password = "zelda";
const cluster = "cluster0";
const dbname = "sample_airbnb";
const uri = `mongodb+srv://${username}:${password}@${cluster}.v6f1uwr.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//Establishing mongodb connection --
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
  console.log(db);
});

//app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});



