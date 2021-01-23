/**
 * UserController requirements
 */
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * User model
 */
let User = require('./User');

/**
 * Create a new User
 */
router.post('/', (req, res) => {
    const newUser = new User({
        ...req.body
    });

    newUser.save()
        .then(() => res.status(201).json('User added !'))
        .catch((error) => res.status(500).json("There was a problem adding the information to the database. " + error));
});

/**
 * Get all users in database
 */
router.get('/', (req, res) => {
   User.find()
       .then((users) => res.status(200).json(users))
       .catch((error) => res.status(500).json("There was a problem finding the users. " + error));
});

/**
 * Get a single user from the database
 */
router.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id})
        .then((user) => {
            if(!user)
            {
                res.status(404).json("No user found !");
            }
            res.status(200).json(user);
        })
        .catch((error) => res.status(500).json("There was a problem finding the user."));
});

/**
 * Delete a user from the database
 */
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then((user) => res.status(200).json("User: " + user.firstname + " " + user.lastname + " was deleted."))
        .catch((error) => res.status(200).json("There was a problem deleting the user."));
});

/**
 * Update a single user in the database
 */
router.put('/:id', (req, res) => {
    User.findOneAndUpdate(req.params.id, req.body, {new: true})
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json("There was a problem updating the user."));
});


module.exports = router;

