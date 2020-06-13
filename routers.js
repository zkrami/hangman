const { Router } = require("express");
const router = Router();
const UserController = require('./controllers/user');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

function UserLoggedIn (req, res, next) {

    if (req.user) {
        return next();
    }
    next('user not logged in ' );

}

router.post('/pro', UserLoggedIn, (req, res) => {

    res.send(req.user);
});

module.exports = router;



