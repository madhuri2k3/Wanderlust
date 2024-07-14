const express= require("express");
const router = express.Router({mergePrams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/reviews.js");


const validateReview = (req, res, next) =>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
};
const reviewController = require("../controllers/reviews.js");

//Reviews
//Post Review Route
router.post("/",
validateReview,
wrapAsync(reviewController.createReview));
  
  //Delete Review Route
  router.delete("/:reviewId", wrapAsync(async(req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  
  }));

  module.exports = router;
  
  