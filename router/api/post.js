const express= require ('express');
const router = express.Router();
const logger = require('../../helper/helper');
const User = require('../../model/users');
const Post = require("../../model/post");
const passport = require("passport");
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null, './uploads')
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
            Post.find()
            //get post in Asending order
                .sort({date: -1})
                .populate('user')
                .then(posts => res.json(posts))
                .catch(err => res.status(404).json({
                    status: "false",
                    message: "error no post found"
                }))

    });


    router.post('/post', upload.single('postImage'), passport.authenticate('jwt', {session: false}), (req, res) => {
        console.log(req.file);
        const newPost = new Post({
            title: req.body.title,
            price: req.body.price,
            location: req.body.location,
            description: req.body.description,
            negAble: req.body.negAble,
            contact: req.body.contact,
            otherIdM: req.body.otherIdM,
            postImage: req.file.path
        });
        console.log(newPost);
        newPost.save()
            .then(post => {
                res.json({
                    status: true,
                    message: "post created successfully",
                    data: {
                        post: post
                    }
                });

            })
            .catch(err => {
                res.json({
                    status: false,
                    message: "creation of post not successful",
                    data: {
                        err: err
                    }
                })
            })


    });





module.exports= router;