const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

//@desc Get goal
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler( async(req, res) => {
    const goals = await Goal.find()
    res.status(200).json({
        message: "Goals fetched successfully!",
        goals
    });
})

//@desc Set goal
//@route POST /api/goals
//@access Private
const setGoals = asyncHandler( async(req, res) => {
    if(!req.body.text) {
        res.status(400)

        throw new Error('text is required')
    }

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(200).json({
        message: "Set goal successfully!",
        goal
    });
})

//@desc Update goal
//@route PUT /api/goals
//@access Private
const updateGoals = asyncHandler( async(req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(404)
        throw new Error('Goal not found')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    
    res.status(200).json({
        message: `Upadated goal with id ${req.params.id} successfully!`,
        updateGoal
    });
})

//@desc Delete goal
//@route DELETE /api/goals
//@access Private
const deleteGoals = asyncHandler( async(req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(404)
        throw new Error('Goal not found')
    }

    goal.remove()

    res.status(200).json({
        message: `Deleted goal with id ${req.params.id} successfully!`
    });
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}