var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var workoutSchema = new mongoose.Schema({
    calenderDate: String,
    userName: String,
    exerciseName: String,
    workoutType: String,
    description: String,
    complete: Boolean
})

workoutSchema.plugin(mongoosePaginate)
const work = mongoose.model('work', workoutSchema)

module.exports = work;


