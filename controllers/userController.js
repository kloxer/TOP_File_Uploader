
var jwt = require('jsonwebtoken');

require('dotenv').config()

const userDb = require("../models/userDb")
const bcrypt = require('bcrypt');



async function login (req,res) {
        const user = {id:1, name:"jon"}
        const username = req.body.username;
        const password = req.body.password;

         jwt.sign({ user:user}, process.env.JWTSECRET, { algorithm: 'HS256' }, function(err, token) {
            if (err ){
                return res.status(500).json({msg:"Error generating token"})
            }
            return res.status(200).json({msg:"Logging in", token:token});
            });
            
}

async function createUser (req,res) {
    console.log(req.body)
    try{    
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const hashedPwd = await bcrypt.hash(password,10)
        const user = await userDb.createUser(username, email, hashedPwd)
        return res.status(201).redirect("/register?success=Account%20Created")
    }
    catch(err)
    {   
        if (err.code === 'P2002'){
            const field = err.meta?.target?.[0];
            return res.status(400).redirect(`/register?error=That%20${field}%20is%20already%20in%20use`);
                }
        console.log(err)
        return res.status(500).redirect('/register?error=Internal%20server%20error');    
    }

}

const getUserInfo = (req,res) =>{
    return res.json({user:req.user, params:req.params.id})
}

module.exports={ login, createUser, getUserInfo}