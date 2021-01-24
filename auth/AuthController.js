/**
 * AuthController requirements
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const verifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

/**
 * User Model
 */
const User = require('../user/User');

/**
 * Configure JWT
 */
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');

/**
 * SingUp
 */
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPassword,
                role: 'ROLE_USER'
            });
            user.save()
                // if user is registered without errors
                // create a token
                .then((user) => {
                    const token = jwt.sign(
                        {userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    );
                    res.status(201).json({
                        userId: user._id,
                        auth: true,
                        token: token,
                        message: 'User signed up successfully.'
                    });
                })
                .catch((error) => {
                    res.status(400).json({error: error | "There was a problem registering the user`."});
                });
        })
        .catch((error) => {
            res.status(500).json({error})
        });
});

/**
 * Login
 */
router.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if(!user)
            {
                return res.status(404).json({message: 'No user found.'});
            }
            //Check if the password is valid
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if(!valid)
                    {
                        return res.status(401).json({
                            message: 'Password is incorrect.',
                            auth: false,
                            token: null
                        });
                    }
                    // if user is found and password is valid
                    // create a token
                    const token = jwt.sign(
                        {userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    );
                    res.status(200).json({
                        userId: user._id,
                        auth: true,
                        token: token
                    });
                })
                .catch((error) => {
                    res.status(400).json({error});
                });
        })
        .catch((error) => {
            res.status(500).json({message: error | 'Error on the server.'});
        })
});


/**
 * Me
 */
router.get('/me', verifyToken, (req, res, next) => {
    //Add a projection to the query and omit the password.
    User.findOne({_id: req.userId}, {password: 0})
        .then((user) => {
            if(!user)
            {
                return res.status(404).json({message: 'No user found.'});
            }
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(500).json({error: error + " There was a problem finding the user."});
        })
});

/**
 * Logout
 */
router.get('/logout', (req, res) => {
    res.status(200).json({ auth: false, token: null });
});

module.exports = router;

