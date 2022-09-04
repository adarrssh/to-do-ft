const express = require('express');
const User = require('../models/User');
const Note = require('../models/Note')
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';
const fetchuser = require("../middleware/fetchuser")


//routes routes

router.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ msg: 'Password and email are required' })
    }
    User.findOne({ email })
        .then(async (savedUser) => {
            let success=false;
            // if already a user exists 
            if (savedUser) {
                return res.status(422).json({success, error: "email already exists" })
            }

            
            // if user doen't exists
            const user = new User({
                email,
                password,
                name,
            })
            // hashing password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);


            // saving the user in mongo database
            user.save()
                .then((user) => {
                    // storing the user's id in data and converting it into jwt token
                    const data = {
                        user: {
                            id: user.id
                        }
                    }
                    const authtoken = jwt.sign(data, JWT_SECRET);
                    success = true
                    res.status(200).json({success,authtoken})
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send("some error occured")
                })
            
            // creating a notes schema for the user 
            const note = new Note({
                user:user.id,
                notes:{
                    title:"Welcome",
                    description:"Write your notes here"
                }
            })

            note.save();


        }).catch((err) => {
            console.log(err);
            // res.status(500).send("some error occured")
        })

})


router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add all fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            let success = false;
            console.log(savedUser);
            if (!savedUser) {
                return res.status(422).json({ error: "invalid email or password" })
            } else {

                bcrypt.compare(req.body.password, savedUser.password)
                    .then((user) => {
                        if (!user) {
                            success = false
                            res.status(422).send({success, msg: "wrong credentials" })
                            
                        } else {
                            const data = {
                                user: {
                                    id: savedUser.id
                                }
                            }

                            // console.log(data);
                            const authtoken = jwt.sign(data, JWT_SECRET);
                            success = true;
                            res.status(200).send({ success, authtoken })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })


            }
        })
        .catch((err) => {
            console.log(err);
        })

})

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        let userId = req.user.id;
        console.log(userId);
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router