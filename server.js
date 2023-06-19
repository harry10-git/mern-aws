require("dotenv").config();

const express = require("express");
var cors = require('cors')
const path  = require('path')

const mongoose = require("mongoose");


const workoutRoutes = require("./routes/workouts");

// expres app
const app = express();
//middleware
app.use(express.json());


// cors
app.use(cors())


// for aws 
app.use(express.static(path.join(__dirname, 'client', 'build')))

// app.get("/*", function(req, res){

//     res.sendFile(
//         path.join(__dirname, "../client/build/index.html"),
//         function (err) {
//           if (err) {
//             res.status(500).send(err);
//           }
//         }
//       );

// })




app.use((req, res, next) => {
  // console.log(req.path, req.method);
  next();
});

// routes
// fire routes only on api/api/workouts
app.use("/api/workouts", workoutRoutes);

// Redirect back to index.html if urls do not match
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

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
