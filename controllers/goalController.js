const asyncHandler = require('express-async-handler')

//@desc Get goal
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler( async(req, res) => {

    res.status(200).json({
        message: "Goals fetched successfully!"
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

    res.status(200).json({
        message: "Set goal successfully!"
    });
})

//@desc Update goal
//@route PUT /api/goals
//@access Private
const updateGoals = asyncHandler( async(req, res) => {
    res.status(200).json({
        message: `Upadated goal with id ${req.params.id} successfully!`
    });
})

//@desc Delete goal
//@route DELETE /api/goals
//@access Private
const deleteGoals = asyncHandler( async(req, res) => {
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