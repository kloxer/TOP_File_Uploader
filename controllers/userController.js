
var jwt = require('jsonwebtoken');

require('dotenv').config()

const userDb = require("../models/userDb")
const bcrypt = require('bcrypt');



async function login (req,res) {
        const username = req.body.username;

        const password = req.body.password;

        try{
            const user = await userDb.findUser(username)
            if (!user){
                return res.status(404).redirect('/login?error=User%20not%20found')
            }
            if (await bcrypt.compare(password, user.password)){ //Needs the await because it's async
                jwt.sign({ userId:user.id}, process.env.JWTSECRET, { algorithm: 'HS256' }, function(err, token) {
                    if (err ){
                        return res.status(500).redirect('/login?error=Error%20generating%20token')
                    }

                    res.cookie('authToken', token, {
                        httpOnly: true,  // Prevents access via JavaScript
                        // secure: process.env.NODE_ENV === 'production',  // Ensures cookie is sent over HTTPS
                        sameSite: 'Strict',  // Mitigates CSRF attacks
                        maxAge: 3600000  // Token expiration (1 hour)
                        });

                    return res.status(200).redirect('/?success=Logged%20in');
                });
            } 
            else{
                return res.status(401).redirect('/login?error=Invalid%20Password')

            }
            
        }
        catch(err){
            return res.status(500).redirect(`/login?error=${err}`)
        }

            
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