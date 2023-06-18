const express = require("express");

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,

} = require("../controllers/workoutControllers");

const router = express.Router();

// get ALL workouts
router.get("/", getWorkouts);
 
// get a SINGLE workout
router.get("/:id", getWorkout);

// post a new workout
router.post("/", createWorkout);

// to delete a workout
router.delete("/:id",deleteWorkout);

// to update a workout
router.patch("/:id",updateWorkout);

module.exports = router;
