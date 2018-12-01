const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const DB = require("./config/keys").mongoURI;
const logger = require("./helper/helper");
const passport = require('passport');
const user = require("./router/api/user");
const profile = require("./router/api/profile");
const post =require('./router/api/post');
mongoose.connect(DB)
    .then(() => {
        logger.log("mongoose:", "connection to DataBase sucessfull");
    })
    .catch(err => console.log(err));

const app = express();
app.use(passport.initialize());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use('/uploads',express.static('uploads'));
app.use("/api/users", user);
app.use('/api/profile', profile);
app.use('/api/post',post);


require("./config/passport")(passport);


const port = process.env.PORT || 4000;
app.listen(port, console.log("server is running on port " + port));

