const express = require('express');
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login")
const Products = require("../models/productsModel")
const multer = require("multer")


router.get("/products", async (req,res)=>{
    try {
        const products = await Products.find()
        res.render("products", {data:products})
    }
    catch (error) {
        res.send("failed to retrieve")
    }
});





module.exports= router