const { Router } = require("express");
const router = Router();
const UserController = require('./controllers/user');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

router.post("/room", (req, res) => { // @todo have to be authorised 
    let room = "GeneratedName"; // @todo generate random name 
    // @todo add to db 
    res.send({ room });
});

function UserLoggedIn (req, res, next) {

    if (req.user) {
        return next();
    }
    next('user not logged in ');

}

router.get('/pro', UserLoggedIn, (req, res) => {

    res.send(req.user);
});

module.exports = router;



