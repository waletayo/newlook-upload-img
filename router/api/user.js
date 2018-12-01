const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const logger = require('../../helper/helper');
const bcrypt = require('bcrypt');
const sendGrid = require('../../helper/mailer');
const jwt = require('jsonwebtoken');
const User = require('../../model/users');
const validateRegisterInput = require('../../validator/register');
const validateLoginInput = require('../../validator/login');
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid) {
        return res.json({
            status: false,
            errors: errors
        });
    }
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.json({
                    status: false,
                    message: "Another user with email already exist"

                })
            } else {
                const newUser = new User({
                    fName: req.body.fName,
                    lName: req.body.lName,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                let sendEmail = sendGrid.sendMail("no-reply@quicklook.com", user.email, "Welcome Email",
                                    "Hello" + user.name + "\n" +
                                    "Welcome to quicklook we got you covered with your housing get an apartment in school " +
                                    "when you still at home" +
                                    "thank you @ team quicklook");
                                if (sendEmail) {
                                    logger.log("Email sent successfully", sendEmail);
                                } else {
                                    logger.log("Sending email failed", sendEmail);
                                }
                                return res.json({
                                    status: true,
                                    code: 200,
                                    message: "Quicklook Acount created Successfully",
                                    data: user
                                })
                            }).catch(err => {
                            logger.log("signup catch error :", err);
                            res.json({
                                status: false,
                                code: 400,
                                message: "hoops an error occur",
                                data: err
                            });
                        });
                    });
                });
            }
        });
});


router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if (!isValid) {
        return res.json({
            status: false,
            errors: errors
        })
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.json({
                    status: false,
                    message: "there is no user with the email"
                })
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            fName: user.fName
                        };
                        jwt.sign(payload, "keys", {expiresIn: 3600}, (error, token) => {
                            logger.log("jwt err:", error);
                            res.json({
                                status: true,
                                message: "Login Successfully",
                                data: {
                                    token: "Bearer "+ token,
                                    user: user
                                }
                            });
                        });
                    }
                })

        })
});


module.exports = router;