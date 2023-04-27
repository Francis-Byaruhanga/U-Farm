const express = require("express");
const {resolve} = require('path');
const app = express();
const path = require('path');
const {title} = require('process');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer')
require("dotenv").config(); 

const User = require("./models/userModel")

//Support parsing of application/json type post data
app.use(bodyParser.json());

//Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended:true}));

//we are creating an environment file
// require("dotenv").config();
const config = require("./config/dataBase")
const homeRoutes = require("./routes/homeRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const contactRoutes = require("./routes/contactRoutes");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");
const authRoutes = require("./routes/authRoutes");
const aoRoutes = require("./routes/aoRoutes");
const foRoutes = require("./routes/foRoutes");
const ufRoutes = require("./routes/ufRoutes");
const productRoutes = require('./routes/productRoutes');

app.use(session({
  secret: "secret", 
  resave: false,
  saveUninitialized: false
}))

// * Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


  

// Creating a connection between the controller and the database.
mongoose.connect(config.dataBase), {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}
const db = mongoose.connection;

//Checking if DB has connected.
db.once("open", () => {
  console.log("connected to db")
});

db.on("error", (err) => {
  console.error(err)
});



//__dirname: It will resolve to your project folder
app.set("view engine","pug")
// app.set("views", path.join(__dirname,"views"));

router.get("/",(req, res)=>{
  res.render("home")
}); 

router.get("/about",(req, res)=>{
  res.render("about",{title: "hello", message: "how are you doing?"})
}); 

router.get("/contact",(req, res)=>{
  res.render("contact",{title: "contact", message: "This is my contact"})
}); 

//Loading assets
app.use("/css", express.static(path.resolve(__dirname, "public/css")));
app.use("/img", express.static(path.resolve(__dirname, "public/images")));
app.use("/js", express.static(path.resolve(__dirname, "public/js")));

app.use("/", homeRoutes); 
app.use("/", aboutRoutes); 
app.use("/", contactRoutes);
app.use("/", registerRoutes);
app.use("/", loginRoutes);
app.use("/", signupRoutes);
app.use("/", authRoutes);
app.use("/", aoRoutes);
app.use("/", foRoutes);
app.use("/", ufRoutes);
app.use("/", productRoutes);



app.get("*", (req,res)=>{
  res.status(404).send("Page does not exist")
})

















// router.get("/", (req, res)=>{
//   res.sendFile(path.join(__dirname + "/index.html"))
// });

// router.get("/about", (req, res)=>{
//   res.sendFile(path.join(__dirname + "/about.html"))
// });

// // Add the router

// app.use("/about", router)



// It should always be the last line in your server file
app.listen(3000, () => console.log("listening on port 3000")); 