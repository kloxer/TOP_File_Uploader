const users = [
    {
        id:1,
        name:"jon"
    }
]


function findUser(id) {
    const user = users.find(user => user.id === id);  // Using Array.find to find the user
    return users[0] || null;  // Return the user object if found, otherwise return null
}


module.exports = {findUser}