
const express = require('express');
const { body, validationResult } = require('express-validator');
const Question = require('../models/quiz');

const router = express.Router();

// Custom validator to check if CorrectAns is one of the Options
const isCorrectAnswer = (value, { req }) => {
    const options = req.body.Options;
    if (!options.includes(value)) {
        throw new Error('Correct answer must be one of the options');
    }
    return true;
};

// POST route for creating a new question
router.post('/addquestion', [
    // Validate request body using express-validator
    body('Question').notEmpty().withMessage('Question is required'),
    body('Options').isArray({ min: 4, max: 4 }).withMessage('Options array must have exactly 4 elements'),
    body('CorrectAns').notEmpty().withMessage('Correct answer is required').custom(isCorrectAnswer)
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create a new question
    const newQuestion = new Question({
        Question: req.body.Question,
        Options: req.body.Options,
        CorrectAns: req.body.CorrectAns
    });

    try {
        // Save the question to the database
        const savedQuestion = await newQuestion.save();
        res.json(savedQuestion);
    } catch (err) {
        res.status(500).json({ message: 'Failed to save question', error: err.message });
    }
});

// delete route for deleting question 
router.delete('/deletequestion/:id', async (req, res) => {
    
    let question = await Question.findById(req.params.id)
    if(!question){return res.status(404).send('Not Found')}
    // if(note.user.toString()!==req.user.id){return res.status(401).send('Not Allowed')}
    //Update the note with the new
    question = await Question.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note deleted successfully",question:question})

})

//Get all Questions 
router.get('/getquestions', async (req, res) => {
    try {
    const questions = await Question.find();
    res.json(questions)
} catch (error) {
    console.log(error.message)
    res.status(500).send("some error occured")
}
})

module.exports = router;
