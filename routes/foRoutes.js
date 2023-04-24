const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const User = require("../models/userModel")


router.get("/fodash", connectEnsureLogin.ensureLoggedIn(), async (req,res)=>{
  let farmerWard= req.user["ward"]
  console.log("farmer ward is:", farmerWard)
  if (req.user.role == "fo"){
    try{
        let activeFarmers = await User.countDocuments();
        let newUrbanFarmers = await User.find({role: "uf", ward: farmerWard})

        res.render("foDash", {
          urbanFarmers: newUrbanFarmers, 
          activeFarmers,
          farmerWard
        })  
    }catch(error){
      res.status(400).send("Could find farmers in the Database")
    }
    
}else{res.redirect("/login")}
}); 


module.exports = router;