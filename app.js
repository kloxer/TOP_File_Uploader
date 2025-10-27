const express = require("express")

const app = express();
// var cors = require('cors')
require('dotenv').config()
const passport = require('./config/passport');  

// app.use(cors())
const userRouter = require("./routes/userRouter")


app.set('view engine', 'ejs'); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT

app.get("/", (req,res)=> {
    res.render("index")
})


//MULTER UPLOADED FILES
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
app.post('/profile', upload.single('uploaded_file'), function (req, res, next) {
  console.log("uploadinggg")
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
    console.log(req.file, req.body)
  res.status(201).send("uploaded")
})


app.get("/register", (req,res)=>{
    res.render("register")
})
app.get("/login", (req,res)=>{
    res.render("login")
})

app.use("/user", userRouter)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});