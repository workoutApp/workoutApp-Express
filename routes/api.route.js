var express = require('express')

var router = express.Router()
var workout = require('./api/workout.route')


router.use('/workouts', workouts);


module.exports = router;