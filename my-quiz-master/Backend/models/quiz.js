// Create a schema for questions : 

const mongoose = require('mongoose')

const { Schema } = mongoose;

const QuizSchema = new Schema({
    Question: {
        type: String,
        required: true
    },
    Options: {
        type: [String],
        required: true,
    },
    CorrectAns: {
        type: String,
        required: true
    }
});
const Question = mongoose.model('question', QuizSchema)
// User.createIndexes()
module.exports = Question;