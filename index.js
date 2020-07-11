const express = require("express");
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const apiRouters = require('./routers');
const bodyParser = require('body-parser');
const passport = require("passport");
const UserModel = require('./models/user');
const socketIO = require("./socket")(server); 
var cors = require('cors');
//var flash = require('connect-flash');
// configs 
mongoose.connect('mongodb://localhost/hangman', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(cors({origin : "http://localhost:3006" , credentials : true  })); 
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
//app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser());

app.get("/", (req, res) => { res.send('success') });
app.get("/login", (req, res) => { res.send('faliure') });


passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await UserModel.findById(id);
        done(null, user);
    } catch (ex) {
        done(err);
    }
});



// api 

app.use('/api', apiRouters);


server.listen(3000, () => {
    console.log('app launched on 3000');    
})
