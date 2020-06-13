
const UserModel = require('../models/user');

const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;

passport.use(new LocalStategy(
    {
        usernameField: 'email'
    },
    async function (email, password, done) {

        try {
            let user = await UserModel.findOne({ email: email });
            if (!user) { return done(null, false); }
            let result = await user.verifyPassword(password); 
            console.log(result); 
            if (!result) { return done(null, false); }
            
            return done(null, user);
        } catch (ex) {
            console.log(ex.message);
            return done(null, false);
        }

    }
));


module.exports = {

    signup: async (req, res) => {
        // @todo validate form data 
        // email dones't already exist 


        try {
            let user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            };
            let response = await UserModel.create(user);
            res.send(response);

        } catch (ex) {
            res.status(400);
            res.send(ex.message);
        }
    },
    login: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
}