const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const Register = require('../models/registerModel')

router.get("/register",(req,res)=>{
    res.render("register")
  }); 
  


router.post("/register", async(req,res)=>{
    try{
        const register = new Register(req.body);
        await register.save()
        res.redirect("/farmers")
        console.log(req.body)
    }
    catch(err){
        console.log(err)
    }
})

router.get("/farmers", connectEnsureLogin.ensureLoggedIn(), async(req,res)=>{
    try{
        let items = await Register.find();
        // console.log(items)
        let fees = await Register.aggregate([
            {
                "$group": {_id: "$all", 
                totalRevenue:{$sum: "$revenue"}}
            }
        ])
        res.render("farmers",{farmers:items, total:Revenue[0]})
    }
    catch(err){
        console.log(err)
        res.send("Failed to retrieve farmer details")
    } 
  }); 
  
router.post("/farmers/delete", async(req,res)=>{
    try{
        await Register.deleteOne({_id:req.body.id});
        res.redirect("back")
    }
    catch(err){
        console.log(err)
    }
});

router.get("/edit_farmer/:id", async(req,res)=>{
    try{
        const item= await Register.findOne({_id:req.params.id});
        res.render("farmer_edit", {farmer:item});
    }
    catch(err){
        res.send("Could not find farmer");
        console.log(err)
    }
})


router.post("/edit_farmer", async(req, res)=>{
    try{
        await Register.findOneAndUpdate({_id:req.query.id}, req.body)
        res.redirect("/farmer")
    }
    catch(err){
        res.send("Could not find farmer");
        console.log(err)
    }
})





module.exports = router;