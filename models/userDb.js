// Use the published @prisma/client package which provides a runtime-compatible client
const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

async function createUser(username, email, password){
	const user = await prisma.user.create({
		data: { 
            username,
             email, 
             password }
	        })
    console.log(user)
	return user

}

async function findUser(usernameId){
    console.log("here Test")
    const user = await prisma.user.findUnique({
        where:{
            id : usernameId
        }
    })
    return user
}

module.exports = {createUser, findUser}