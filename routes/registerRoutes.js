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
        res.redirect("/students")
        console.log(req.body)
    }
    catch(err){
        console.log(err)
    }
})

router.get("/students", connectEnsureLogin.ensureLoggedIn(), async(req,res)=>{
    try{
        let items = await Register.find();
        // console.log(items)
        let fees = await Register.aggregate([
            {
                "$group": {_id: "$all", 
                totalFees:{$sum: "$fees"}   }
            }
        ])
        res.render("students",{students:items, total:fees[0]})
    }
    catch(err){
        console.log(err)
        res.send("Failed to retrieve student details")
    } 
  }); 
  
router.post("/students/delete", async(req,res)=>{
    try{
        await Register.deleteOne({_id:req.body.id});
        res.redirect("back")
    }
    catch(err){
        console.log(err)
    }
});

router.get("/edit_student/:id", async(req,res)=>{
    try{
        const item= await Register.findOne({_id:req.params.id});
        res.render("student_edit", {student:item});
    }
    catch(err){
        res.send("Could not find student");
        console.log(err)
    }
})


router.post("/edit_student", async(req, res)=>{
    try{
        await Register.findOneAndUpdate({_id:req.query.id}, req.body)
        res.redirect("/students")
    }
    catch(err){
        res.send("Could not find student");
        console.log(err)
    }
})





module.exports = router;