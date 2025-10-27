
var jwt = require('jsonwebtoken');

require('dotenv').config()



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


const createUser = (req,res) =>{
    return res.send("creating user");
}

const getUserInfo = (req,res) =>{
    return res.json({user:req.user, params:req.params.id})
}

module.exports={firstFunction, login, createUser, getUserInfo}