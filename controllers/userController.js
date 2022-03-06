const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//@desc    Register user
//@route   POST /api/user
//@access  Public 
const registerUser = asyncHandler( async(req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        res.status(400)

        throw new Error('Please add all fields')
    }

    res.json({message: 'Registered User'})

})

//@desc    Login user
//@route   POST /api/user/login  
//@access  Public 
const loginUser = asyncHandler(async(req, res) => {
    res.json({message: 'Login user'})
})

//@desc    Get user
//@route   Get /api/user/me
//@access  Public 
const getUser = asyncHandler( async (req, res) => {
    res.json({message: 'user data'})
})

module.exports = {
    registerUser,
    loginUser,
    getUser
}