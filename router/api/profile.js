const express = require('express');
const bodyPaser = require('body-parser');
const router = express.Router();
const logger = require('../../helper/helper');
const User = require('../../model/users');
const Profile = require("../../model/UserProfile");
const passport = require("passport");
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null, './uploads/profilePicture')
    },
    filename: function (req,file,cb) {
        cb(null,new Date().toISOString()+file.originalname)
    }
});
const fileFilter=(req,file,cb)=>{
    if (file.mimetype=== "image/jpeg" || file.mimetype ==='image/png') {
        cb(null,true)
    }else {
        cb(null, false);

    }};


const upload =multer({
    storage:storage,limits: {
        fileSize: 1024 *1024 *5//5mb
    },
    fileFilter : fileFilter
});




router.get('/', (req, res) => {
    res.json({
        status: "true",
        message: "this is the profile route"
    });
});


router.post('/', upload.single('profilePicture'), passport.authenticate('jwt', {session: false}), (req, res) => {
    const profileField = {};
    profileField.user = req.user.id;
    if (req.body.Nickname) profileField.Nickname = req.body.Nickname;
    if (req.body.student) profileField.student = req.body.student;
    if (req.body.phoneNumber) profileField.phoneNumber = req.body.phoneNumber;
    if (req.body.nextOfKin) profileField.nextOfKin = req.body.nextOfKin;
    if (req.body.nextOfKinAdress) profileField.nextOfKinAdress =req.body.nextOfKinAdress;
    if (req.body.address) profileField.address = req.body.address;
   if (req.file.path)  profileField.profilePicture =req.file.profilePicture;
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if (profile) {
                Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileField},
                    {new: true})
                    .then(profile => res.json({
                        status: true,
                        message: "profile created successfully",
                        data: {
                            profile: profile
                        }
                    }));

            } else {
                //create profile updater
                Profile.findOne({Nickname: profileField.Nickname})
                    .then(profile => {
                        if (profile) {
                            errors.handle = "handle already exist";
                            res.status(400).json({
                                status: false,
                                message: errors
                            });
                        }
                        //save
                        new Profile(profileField).save().then(profile => res.json({
                            status: true,
                            message: "profile update is successful",
                            data: {
                                profile: profile
                            }
                        }))
                    });

            }
        });


})


router.post('/education', passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const newEducation = {
                schoolName: req.body.schoolName,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
            }
            console.log(newEducation);
            //add to profile array list
            profile.education.unshift(newEducation);
            profile.save().then(profile => {
                res.json({
                    status: true,
                    message: "education added successfully",
                    data: {
                        profile: profile
                    }

                });


            })
        })
});


router.get('/all', (req, res) => {
    Profile.find()
        .populate('user')
        .then(profiles => {
            if (!profiles) {
                return res.status(404).json({
                    status: false,
                    message: "profile is not available for now "
                });
            }
            res.json({
                status: true,
                data: {
                    profiles: profiles
                }

            });
        }).catch(err => {
        res.status(404).json({
            status: false,
            message: "hoop an error occur"
        });
    })
});

router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({user: req.params.user_id})
        .populate('user')
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'there  is no profile for ths user';
                res.status(404).json({
                    status: true,
                    message: "invalid id"
                });
            } else {
                res.json({
                    status: true,
                    message: "profile",
                    data: {
                        profile: profile
                    }
                });
            }
        })
        .catch(err => {
            logger.log("profile by id error", err);
            res.status(404).json({profile: "there is no profile for this user"});
        })
});


module.exports = router;





