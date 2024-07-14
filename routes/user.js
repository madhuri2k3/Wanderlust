const express= require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");

const userController =  require("../controllers/users.js");

router.route("/signup")
.get( userController.renderSignupForm)
.post( wrapAsync(userController.signUp));

router.route("/login")
.get(userController.renderLoginForm)
.post(savedRedirectUrl,
passport.authenticate("local",
{ failureRedirect: '/login', 
failureFlash:true }), 
userController.login);



// router.post("/signup", wrapAsync(req, res) => {
//     let{username, email, password} = req.body;   
//     const newUser = new User({email, username});
//     const registeredUser = await User.register(newUser, password);
//     console.log(registeredUser);
//     req.flash("success","Welcome to Wanderlust!");
//     res.redirect("/listings");
// });

router.get("/login",userController.renderLoginForm);

router.post("/login",savedRedirectUrl,
passport.authenticate("local",
{ failureRedirect: '/login', 
failureFlash:true }), 
userController.login);


router.get("/logout",userController.logout);

module.exports = router;