
var jwt = require('jsonwebtoken');

require('dotenv').config()

const userDb = require("../models/userDb")
const bcrypt = require('bcrypt');

const firstFunction = (req,res) =>{
    return res.send("first func")
}

async function login (req,res) {
         const user = {id:1, name:"jon"}

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
        return res.status(201).send({success:true, user:user})
    }
    catch(err)
    {   
        if (err.code === 'P2002'){
            const field = err.meta?.target?.[0];
            return res.status(400).json({
                success:false,
                msg:`That ${field} is already in use`,
            })
        }
        console.log(err)
        return res.status(500).send({success:false, msg:"Internal server error"})
    }

}

const getUserInfo = (req,res) =>{
    return res.json({user:req.user, params:req.params.id})
}

module.exports={firstFunction, login, createUser, getUserInfo}