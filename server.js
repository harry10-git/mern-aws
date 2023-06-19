// require("dotenv").config();

const express = require("express");
var cors = require('cors')
const mongoose = require("mongoose");

// expres app
const app = express();

// for aws
const path = require("path");

app.use(express.static(path.join(__dirname, "client/build")))

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "./client/build");
app.use(express.static(buildPath))
app.get("/*", function(req, res){

  res.sendFile(
      path.join(__dirname, "./client/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );

})


const workoutRoutes = require("./routes/workouts");


app.use(cors())

//middleware
app.use(express.json());

app.use((req, res, next) => {
  // console.log(req.path, req.method);
  next();
});

// routes
// fire routes only on api/api/workouts
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect('mongodb+srv://harry:harry@mernapp.hx8p8xf.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    // listen for request
    app.listen(3001, () => {
      console.log("connected to db & server on 3001");
    });
  })
  .catch((error) => {
    console.log(error);
  });
