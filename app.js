const express = require("express")

const app = express();
var cors = require('cors')
require('dotenv').config()
const passport = require('./config/passport');  

app.use(cors())
const userRouter = require("./routes/userRouter")
app.set('view engine', 'ejs'); 

const port = process.env.PORT

app.get("/", (req,res)=> {
    res.render("index")
})


//mULTER UPLOADS FILES
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log("uploadinggg")
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
    console.log(req.file, req.body)
  res.send("uploaded")
})


app.use("/user", userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})