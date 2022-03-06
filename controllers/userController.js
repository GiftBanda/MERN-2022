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

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,

    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
            res.status(400)
            throw new Error('Invalid user data')

    }

})

//@desc    Login user
//@route   POST /api/user/login  
//@access  Public 
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    res.json({message: 'Login user'})
})

//@desc    Get user
//@route   Get /api/user/me
//@access  Public 
const getUser = asyncHandler( async (req, res) => {
    const {_id, name, email} = await User.findById(req.user._id);

    res.json({
        _id,
        name,
        email
    })
})

//generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}