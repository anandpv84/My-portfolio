const users = require('../Modals/userSchema')
const jwt = require('jsonwebtoken')

// exports.register = (req, res) => {
//    
//     res.status(200).json("registration request")
// }


exports.login = async (req, res) => {
    console.log("inside login controller function")
    const { username, password } = req.body;
    try{
        const existinguser =await users.findOne({username:username,password:password})
        if(existinguser){
            const token = jwt.sign({userId:existinguser._id},'superkey123')
            console.log("token is ",token)
            res.status(200).json({
                existinguser,
                token
            })
        }else{
            res.status(406).json("invalid username or password")
        }
    }catch(err){
        res.status(401).json("login request faild due to", err)
    }

} 
