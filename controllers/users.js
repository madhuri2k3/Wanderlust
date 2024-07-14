const User = require("../models/user");

module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
};
module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
};

module.exports.signUp = async (req, res) => {
    let { username, email, password } = req.body;   
    const newUser = new User({ email, username });
    try {
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
           if(err){
            return next(err);
           } 
           req.flash("success", "Welcome to Wanderlust!");
           res.redirect("/listings");
        });
  
    } catch (error) {
        // Handle any errors that might occur during registration
        console.error(error);
        res.flash("error", "Failed to register user");
        res.redirect("/signup");
    }
};

module.exports.login = async(req,res)=>{
    res.flash("success","Welcome to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
module.exports.logout =  (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });
};